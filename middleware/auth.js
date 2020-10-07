const {decodeBase64} = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

module.exports = async function (req, res, next) {
	const token = req.header('x-auth-token');

	if (!token) {
		return res.status(401).json({success: false, msg: 'Invalid token'});
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		const {rows} = await pool.query(`SELECT * FROM users WHERE id = $1`, [decoded.userId]);

		res.json(req);

		if (!rows[0]) {
			return res.status(400).json({success: false, msg: 'Invalid token'});
		}

		req.user = {
			id: decoded.userId
		};
		next();
	} catch (error) {
		res.status(401).json({success: false, msg: 'Authorization Denied'});
	}
};
