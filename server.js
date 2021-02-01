const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
dotenv.config({path: './config/config.env'});
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const helmet = require('helmet');

const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(helmet());

app.use('/api/product', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/reviews', require('./routes/reviews'));
app.use('/api/orders', require('./routes/orders'));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, 'client', 'build')));

	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 5000;
const mode = process.env.NODE_ENV || 'Default';

app.listen(port, () => {
	console.log(`Express server running on port ${port}, in ${mode} mode!`.cyan.underline.bold);
});
