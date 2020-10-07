const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const authorizeRole = require('../middleware/authorizeRole');

//  @ Route			POST /api/users
//  @ Desc			Register a user
//  @ Access		Private
router.post('/register', [check('name', 'Name is required').not().isEmpty(), check('email', 'Valid email address is required').isEmail(), check('password', 'Password is required, and must contain at least 6 characters').isLength({min: 6}), check('isadmin', 'Must specify admin status').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, errors: errors.array()});
	}

	const {name, email, password, isadmin} = req.body;

	try {
		let findEmail = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

		if (findEmail.rowCount === 1) {
			return res.status(400).json({success: false, msg: `The email address ${email} is already in use, please try another one or contact a site admin`});
		}

		await pool.query(`INSERT INTO users (name, email, password, isadmin) VALUES ($1, $2, $3, $4)`, [name, email, password, isadmin]);

		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		await pool.query(`UPDATE users set password = $1 where email = $2`, [hashedPassword, email]);

		let theUser = await pool.query(`SELECT id FROM users WHERE email = $1`, [email]);

		const payload = {
			theUser: {
				id: theUser.rows[0].id
			}
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN
			},
			async (err, token) => {
				if (err) {
					await pool.query(`DELETE FROM users WHERE email = $1`, [email]);
					console.error(err);
					res.status(400).json({success: false, msg: 'Contact site administrator'});
				} else {
					res.json({token});
				}
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

//  @ Route			POST /api/users
//  @ Desc			Login user
//  @ Access		Public
router.post('/login', [check('email', 'Email is required').isEmail(), check('password', 'Valid password is required').isLength({min: 6})], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, errors: errors.array()});
	}

	const {email, password} = req.body;
	try {
		let user = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

		if (user.rowCount === 0) {
			return res.status(400).json({success: false, msg: `Invalid Credentials`});
		}

		const isMatch = await bcrypt.compare(password, user.rows[0].password);

		if (!isMatch) {
			return res.status(400).json({success: false, msg: `Invalid Credentials`});
		}

		let theUser = await pool.query(`SELECT id FROM users WHERE email = $1`, [email]);

		const payload = {
			theUser: {
				id: theUser.rows[0].id
			}
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRES_IN
			},
			(err, token) => {
				if (err) {
					console.error(err);
					res.status(400).json({success: false, msg: 'Invalid Credentials'});
				} else {
					res.json({token});
				}
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

// User CRUD routes //

//  @ Route			GET /api/users
//  @ Desc			Get all users
//  @ Access		Private
router.get('/', auth, authorizeRole, async (req, res) => {
	try {
		const users = await pool.query(`SELECT * FROM users`);

		res.json({success: true, count: users.rowCount, users: users.rows});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

//  @ Route			GET /api/users/:id
//  @ Desc			Get user by id
//  @ Access		Private
router.get('/:id', auth, authorizeRole, async (req, res) => {
	try {
		const user = await pool.query(`SELECT * FROM users WHERE id = ${req.params.id}`);

		if (user.rows.length === 0) {
			return res.status(404).json({success: false, msg: `No user found with the id of ${req.params.id}`});
		}

		res.json({success: true, user: user.rows[0]});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

//  @ Route			PUT /api/users/:id
//  @ Desc			Update user by id
//  @ Access		Private
router.put('/:id', auth, authorizeRole, [check('name', 'Name is required').not().isEmpty(), check('email').isEmail(), check('isadmin', "Must determine user's admin status").isBoolean()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, errors: errors.array()});
	}

	const {name, email, isadmin} = req.body;

	try {
		const user = await pool.query(`SELECT * FROM users WHERE id = ${req.params.id}`);

		if (user.rows.length === 0) {
			return res.status(404).json({success: false, msg: `No user found with the id of ${req.params.id}`});
		}

		let updateUser = await pool.query(`UPDATE users SET name = $1, email = $2, isadmin = $3 WHERE id = ${req.params.id} RETURNING *`, [name, email, isadmin]);

		res.json({success: true, msg: 'User updated successfully!', user: updateUser.rows[0]});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

//  @ Route			DELETE /api/users/:id
//  @ Desc			Delete user by id
//  @ Access		Private
router.delete('/:id', auth, authorizeRole, async (req, res) => {
	try {
		const user = await pool.query(`SELECT * FROM users WHERE id = ${req.params.id}`);

		if (user.rows.length === 0) {
			return res.status(404).json({success: false, msg: `No user found with the id of ${req.params.id}`});
		}

		const deleteUser = await pool.query(`DELETE FROM users WHERE id = ${req.params.id}`);

		res.json({success: true, msg: `User ${req.params.id} has been deleted successfully!`});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
