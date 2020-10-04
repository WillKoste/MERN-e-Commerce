import React, {Fragment, useEffect, useState} from 'react';
import {Row, Col} from 'react-bootstrap';
import Product from '../products/Product';
import axios from 'axios';

const HomeScreen = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await axios.get('http://localhost:5004/api/product');

			setProducts(res.data.products);
		};

		fetchProducts();
	}, []);

	return (
		<Fragment>
			<h1>Latest Products</h1>
			<Row>
				{products.map((prod) => (
					<Col key={prod.id} sm={12} md={6} lg={4} xl={3}>
						<Product prod={prod} />
					</Col>
				))}
			</Row>
		</Fragment>
	);
};

export default HomeScreen;
