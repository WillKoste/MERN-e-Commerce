import React, {Fragment, useEffect} from 'react';
import {Row, Col} from 'react-bootstrap';
import PropTypes from 'prop-types';
import Product from '../products/Product';
import Spinner from './Spinner';
import {connect} from 'react-redux';
import {getProducts} from '../../actions/products';

const HomeScreen = ({getProducts, productRed: {products, loading}}) => {
	useEffect(() => {
		getProducts();
	}, [getProducts]);

	return (
		<Fragment>
			<h1 className='display-4 mb-4'>Latest Products</h1>
			{loading ? (
				<Spinner />
			) : (
				<Row>
					{products.map((prod) => (
						<Col key={prod.id} sm={12} md={6} lg={4} xl={3}>
							<Product prod={prod} />
						</Col>
					))}
				</Row>
			)}
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
