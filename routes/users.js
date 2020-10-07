const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

//  @ Route			GET /api/users
//  @ Desc			Get all users
//  @ Access		Public
router.get('/', async (req, res) => {
	try {
		const users = await pool.query(`SELECT * FROM users`);

		res.json({success: true, count: users.rowCount, users: users.rows});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

//  @ Route			POST /api/users
//  @ Desc			Get all users
//  @ Access		Public
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

		let theUser = pool.query(`SELECT id FROM users WHERE email = $1`, [email]);

		const payload = {
			theUser: {
				id: theUser.id
			}
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: '1d'
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
//  @ Desc			Get all users
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

		let theUser = pool.query(`SELECT id FROM users WHERE email = $1`, [email]);

		const payload = {
			theUser: {
				id: theUser.id
			}
		};

		jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{
				expiresIn: '1d'
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

module.exports = router;
