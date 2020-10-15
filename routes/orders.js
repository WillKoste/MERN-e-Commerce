const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');
const pool = require('../config/db');

// Going to need to create an advanced SQL query with inner join to gather the data for

//  @ Route			POST /api/orders/:id 		(`/api/orders/${req.user.id}`)
//  @ Desc			Create order
//  @ Access		Private
router.post('/:id', auth, [check('orderItems', 'Order Items are required to create an order').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, errors: errors.array()});
	}

	const {orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;

	try {
		const order = await pool.query(`INSERT INTO orders (orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id, orderItems, shippingAddress`, [orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice]);

		res.status(201).json({success: true, msg: 'Order has been created.', order: order.rows[0]});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

//  @ Route			POST /api/orders
//  @ Desc			Create orderitems
//  @ Access		Private
router.post('/items', auth, async (req, res) => {
	const {name, qty, image, price, product_id} = req.body;

	try {
		let orderItem = await pool.query(`INSERT INTO orderitems (name, qty, image, price, product_id) VALUES ($1, $2, $3, $4, $5) RETURNING name, qty, product_id`, [name, qty, image, price, product_id]);

		res.status(201).json({success: true, msg: 'Order Item has been created.', orderItem: orderItem.rows[0]});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

//  @ Route			POST /api/orders
//  @ Desc			Create shippingaddress
//  @ Access		Private
router.post('/address', auth, async (req, res) => {
	const {address, city, postal_code, country, user_id} = req.body;

	try {
		let shippingAddress = await pool.query(`INSERT INTO shippingaddresses (address, city, postal_code, country, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING address, postal_code, user_id`, [address, city, postal_code, country, user_id]);

		res.status(201).json({success: true, msg: 'Shipping Address has been created.', shippingAddress: shippingAddress.rows[0]});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
