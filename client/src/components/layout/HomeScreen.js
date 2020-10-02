import React, {Fragment} from 'react';
import {Row, Col} from 'react-bootstrap';
import products from '../../products';
import Product from '../products/Product';

const HomeScreen = () => {
	return (
		<Fragment>
			<h1>Latest Products</h1>
			<Row>
				{products.map((prod) => (
					<Col key={prod._id} sm={12} md={6} lg={4} xl={3}>
						<Product prod={prod} />
					</Col>
				))}
			</Row>
		</Fragment>
	);
};

export default HomeScreen;
