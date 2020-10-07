import React, {Fragment, useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Product from '../products/Product';
import {connect} from 'react-redux';
import {getProducts} from '../../actions/products';
import axios from 'axios';

const HomeScreen = ({getProducts, productRed}) => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		console.log('It rannnn');
		getProducts();
	}, [getProducts]);

	return (
		<Fragment>
			<h1 className='display-4 mb-4'>Latest Products</h1>
			<Row>
				{productRed.products.map((prod) => (
					<Col key={prod.id} sm={12} md={6} lg={4} xl={3}>
						<Product prod={prod} />
					</Col>
				))}
			</Row>
		</Fragment>
	);
};

HomeScreen.propTypes = {
	getProducts: PropTypes.func.isRequired,
	productRed: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	productRed: state.productRed
});

export default connect(mapStateToProps, {getProducts})(HomeScreen);
