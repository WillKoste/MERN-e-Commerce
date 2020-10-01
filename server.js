const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const colors = require('colors');

const app = express();

const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || 'Default';

app.listen(port, () => {
	console.log(`Express server running on port ${port}, in ${mode} mode!`.cyan.underline.bold);
});
