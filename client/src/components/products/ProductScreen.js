import React, {Fragment, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem} from 'react-bootstrap';
import Rating from './Rating';
import CurrencyFormat from 'react-currency-format';
import axios from 'axios';

const ProductScreen = ({match}) => {
	const [product, setProduct] = useState({});

	useEffect(() => {
		const fetchProject = async () => {
			const res = await axios.get(`/api/product/${match.params.id}`);

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
					<Image src={product.image} width={'100%'} alt={product.name} fluid='true' />
				</Col>
				<Col md={3}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h3>{product.name}</h3>
						</ListGroupItem>
						<ListGroupItem>
							<Rating value={product.rating} text={`${product.numreviews} Reviews`} />
						</ListGroupItem>
						<ListGroupItem>
							<strong>Price:</strong> ${<CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} />}
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
										<strong>${<CurrencyFormat value={product.price} displayType={'text'} thousandSeparator={true} />}</strong>
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
									<Col>{product.countinstock === 0 ? <span className='text-danger'>Item Unavailable</span> : product.countinstock > 0 && product.countinstock <= 5 ? <span style={{color: '#CDB800'}}>Limited availability</span> : <span style={{color: '#18BE01'}}>Item in stock</span>}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Button disabled={product.countinstock === 0 ? true : false} className='btn btn-primary btn-block'>
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
