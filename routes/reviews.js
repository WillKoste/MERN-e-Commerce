const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
	try {
		res.send('You A REVIEW thang babyy');
	} catch (err) {
		console.error(err);
		res.status(500).send('Server Error');
	}
});

module.exports = router;
