import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap';
import Rating from './Rating';
import products from '../../products';
import axios from 'axios';

const ProductScreen = ({match}) => {
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProject = async () => {
			const res = await axios.get(`http://localhost:5004/api/product/${match.params.id}`);

			setProduct(res.data.product);
		};

		fetchProject();
	}, []);

	// const product = products.find((prod) => prod.id === match.params.id);

	return (
		<Fragment>
			<Link className='btn btn-dark my-3 px-4' to='/'>
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid='true' />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h3>{product.name}</h3>
						</ListGroupItem>
						<ListGroupItem>
							<Rating value={product.rating} text={`${product.numReviews} Reviews`} />
						</ListGroupItem>
						<ListGroupItem>
							<strong>Price:</strong> ${product.price}
						</ListGroupItem>
						<ListGroupItem>
							<strong>Description:</strong> {product.description}
						</ListGroupItem>
						<ListGroupItem>
							<strong>Brand:</strong> {product.brand}
						</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Brand:</Col>
									<Col>
										<strong>{product.brand}</strong>
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Product Status:</Col>
									<Col>{product.countInStock === 0 ? `Item Unavailable` : product.countInStock > 0 && product.countInStock <= 5 ? `Limited availability` : 'Item in stock'}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Button disabled={product.countInStock === 0 ? true : false} className='btn btn-primary btn-block'>
									Add To Cart
								</Button>
								<Button className='btn btn-success btn-block'>Buy Now</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

export default ProductScreen;
