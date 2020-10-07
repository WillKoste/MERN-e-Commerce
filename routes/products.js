const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const {check, validationResult} = require('express-validator');

const imageDefault = '/images/placeholder.png';

const checkDefaultNum = (term) => {
	if (term === '' || term === null) {
		return 0;
	} else {
		return term;
	}
};

router.get('/', async (req, res) => {
	try {
		const products = await pool.query(`SELECT * FROM products`);

		res.json({success: true, count: products.rowCount, products: products.rows});
	} catch (err) {
		console.error(err);
		res.send('Server Error');
	}
});

router.get('/:id', async (req, res) => {
	try {
		const product = await pool.query(`SELECT * FROM products WHERE id = ${req.params.id}`);

		if (product.rows.length === 0) {
			return res.status(404).json({success: false, msg: `No product found with the id of ${req.params.id}`});
		}

		res.json({success: true, product: product.rows[0]});
	} catch (err) {
		console.error(err);
		res.send('Server Error');
	}
});

router.post('/', [check('name', 'Product name is required').not().isEmpty(), check('price', 'Product price is required').not().isEmpty(), check('countinstock', 'Must include the total inventory of the product being created').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, errors: errors.array()});
	}

	const {name, image, description, brand, category, price, countinstock, rating, numreviews} = req.body;

	try {
		let product = await pool.query(`INSERT INTO products (name, image, description, brand, category, price, countinstock, rating, numreviews) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`, [name, image === '' || image === null ? imageDefault : image, description, brand, category, checkDefaultNum(price), checkDefaultNum(countinstock), checkDefaultNum(rating), checkDefaultNum(numreviews)]);

		res.status(201).json({success: true, msg: 'Product has been added!', product: product.rows});
	} catch (err) {
		console.error(err);
		res.status(400).json({success: false, msg: 'Bad request, please try again'});
	}
});

router.put('/:id', [check('name', 'Product name is required').not().isEmpty(), check('price', 'Product price is required').not().isEmpty(), check('countinstock', 'Must include the total inventory of the product being created').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, errors: errors.array()});
	}

	const {name, image, description, brand, category, price, countinstock, rating, numreviews} = req.body;

	try {
		const product = await pool.query(`SELECT * FROM products WHERE id = ${req.params.id}`);

		if (product.rows.length === 0) {
			return res.status(404).json({success: false, msg: `No product found with the id of ${req.params.id}`});
		}

		let updateProduct = await pool.query(`UPDATE products SET name = $1, image = $2, description = $3, brand = $4, category = $5, price = $6, countinstock = $7, rating = $8, numreviews = $9 WHERE id = ${req.params.id} RETURNING *`, [name, image, description, brand, category, price, countinstock, rating, numreviews]);

		res.status(201).json({success: true, msg: 'Product has been updated', product: updateProduct.rows[0]});
	} catch (err) {
		console.error(err);
		res.status(400).json({success: false, msg: 'Bad request, please try again'});
	}
});

router.delete('/:id', async (req, res) => {
	try {
		const product = await pool.query(`SELECT * FROM products WHERE id = ${req.params.id}`);

		if (product.rows.length === 0) {
			return res.status(404).json({success: false, msg: `No product found with the id of ${req.params.id}`});
		}

		const deleteProduct = await pool.query(`DELETE FROM products WHERE id = ${req.params.id}`);

		res.json({success: true, msg: `Product ${req.params.id} has been deleted!`});
	} catch (err) {
		console.error(err);
		res.status(400).json({success: false, msg: 'Bad request, please try again'});
	}
});

module.exports = router;
