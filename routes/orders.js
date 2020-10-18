const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const pool = require('../config/db');

//  @ Route			POST /api/orders/address
//  @ Desc			Create shippingaddress
//  @ Access		Private
router.post('/address', auth, async (req, res) => {
	const {address, city, postal_code, country, user_id} = req.body;

	try {
		if (req.user.id !== user_id) {
			return res.status(201).json({success: false, msg: 'User not authorized'});
		}

		const alreadyExists = await pool.query(`SELECT * FROM shippingaddresses WHERE user_id = $1`, [user_id]);

		if (alreadyExists.rows[0]) {
			let updateAddress = await pool.query(`UPDATE shippingaddresses SET address = $1, city = $2, postal_code = $3, country = $4, user_id = $5 WHERE user_id = $6 RETURNING id, address, postal_code, country, user_id`, [address, city, postal_code, country, user_id, user_id]);

			res.json({success: true, msg: 'Shipping Address has been updated.', shippingAddress: updateAddress.rows[0]});
		} else {
			let shippingAddress = await pool.query(`INSERT INTO shippingaddresses (address, city, postal_code, country, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING id, address, postal_code, country, user_id`, [address, city, postal_code, country, user_id]);

			res.status(201).json({success: true, msg: 'Shipping Address has been created.', shippingAddress: shippingAddress.rows[0]});
		}
	} catch (err) {
		if (err.code === '23503') {
			return res.status(404).json({success: false, msg: `No user found with the id of ${user_id}`});
		}

		console.error(err);
		res.status(500).send('Server Error');
	}
});

//  @ Route			POST /api/orders/items
//  @ Desc			Create orderitems
//  @ Access		Private
router.post('/items', auth, async (req, res) => {
	const {name, qty, image, price, product_id, transaction_number} = req.body;

	try {
		let orderItem = await pool.query(`INSERT INTO orderitems (name, qty, image, price, product_id, transaction_number) VALUES ($1, $2, $3, $4, $5, $6) RETURNING name, qty, product_id, transaction_number`, [name, qty, image, price, product_id, transaction_number]);

		res.status(201).json({success: true, msg: 'Order Item has been created.', orderItem: orderItem.rows[0]});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// Going to need to create an advanced SQL query with inner join to gather the data for

//  @ Route			POST /api/orders/:id 		(`/api/orders/${req.user.id}`)
//  @ Desc			Create order
//  @ Access		Private
router.post('/place', auth, [check('transaction_number', 'Order Items are required to create an order').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, errors: errors.array()});
	}

	const {transaction_number, shipping_address_id, payment_method, payment_result, tax_price, shipping_price, total_price, is_paid} = req.body;

	try {
		const order = await pool.query(`INSERT INTO orders (transaction_number, shipping_address_id, payment_method, payment_result, tax_price, shipping_price, total_price, is_paid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, transaction_number, shipping_address_id`, [transaction_number, shipping_address_id, payment_method, payment_result, tax_price, shipping_price, total_price, is_paid]);

		res.status(201).json({success: true, msg: 'Order has been created.', order: order.rows[0]});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
