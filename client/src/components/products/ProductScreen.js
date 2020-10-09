import React, {Fragment, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, ListGroupItem, Form} from 'react-bootstrap';
import {getSingleProduct} from '../../actions/singlePoducts';
import Rating from './Rating';
import Spinner from '../layout/Spinner';
import CurrencyFormat from 'react-currency-format';

const ProductScreen = ({match, history, getSingleProduct, singleProductRed: {product, loading}}) => {
	const [qty, setQty] = useState(1);

	useEffect(() => {
		getSingleProduct(match.params.id);
	}, [match.params.id, getSingleProduct]);

	const onChange = (e) => {
		setQty(e.target.value);
	};

	const onSubmitCart = (e) => {
		history.push(`/cart/${match.params.id}?qty=${qty}`);
	};

	const onSubmitBuyNow = (e) => {
		e.preventDefault();
	};

	return (
		<Fragment>
			<Link className='btn btn-dark my-3 px-4' to='/'>
				Go Back
			</Link>
			{loading ? (
				<Spinner />
			) : (
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
								{product.countinstock > 0 && (
									<ListGroupItem>
										<Row>
											<Col>Qty</Col>
											<Col>
												<Form.Control as='select' value={qty} onChange={onChange}>
													{[...Array(product.countinstock).keys()].map((val) => (
														<option key={val + 1} value={val + 1}>
															{val + 1}{' '}
														</option>
													))}
												</Form.Control>
											</Col>
										</Row>
									</ListGroupItem>
								)}
								<ListGroupItem>
									<Button onClick={onSubmitCart} disabled={product.countinstock === 0 ? true : false} className='btn btn-primary btn-block'>
										Add To Cart
									</Button>
									<Button onClick={onSubmitBuyNow} disabled={product.countinstock === 0 ? true : false} className='btn btn-success btn-block'>
										Buy Now
									</Button>
								</ListGroupItem>
							</ListGroup>
						</Card>
					</Col>
				</Row>
			)}
		</Fragment>
	);
};

ProductScreen.propTypes = {
	getSingleProduct: PropTypes.func.isRequired,
	singleProductRed: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	singleProductRed: state.singleProductRed
});

export default connect(mapStateToProps, {getSingleProduct})(ProductScreen);
