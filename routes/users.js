const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const {check, validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.get('/', async (req, res) => {
	try {
		const users = await pool.query(`SELECT * FROM users`);

		res.json({success: true, count: users.rowCount, users: users.rows});
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

router.post('/', [check('name', 'Name is required').not().isEmpty(), check('email', 'Valid email address is required').isEmail(), check('password', 'Password is required, and must contain at least 6 characters').not().isEmpty().isLength({min: 6}), check('isadmin', 'Must specify admin status').not().isEmpty()], async (req, res) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({success: false, errors: errors.array()});
	}

	const {name, email, password, isadmin} = req.body;

	try {
		let findEmail = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

		if (findEmail.rowCount === 1) {
			console.log(findEmail.rows[0].password);
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
			(err, token) => {
				if (err) throw err;
				res.json({token});
			}
		);
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
