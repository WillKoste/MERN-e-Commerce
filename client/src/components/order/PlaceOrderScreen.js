import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CheckoutSteps from '../layout/CheckoutSteps';
import CurrencyFormat from 'react-currency-format';

const PlaceOrderScreen = ({cart: {cartItems, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice}}) => {
	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	itemsPrice = addDecimals(cartItems.reduce((a, b) => a + b.price * b.qty, 0));
	shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
	taxPrice = addDecimals(itemsPrice * 0.15);
	totalPrice = addDecimals(+itemsPrice + +shippingPrice + +taxPrice);

	const placeOrder = (e) => {
		alert('It worked :)');
	};

	return (
		<Fragment>
			<CheckoutSteps step1 step2 step3 step4 />
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong> {shippingAddress.address}, {shippingAddress.city} {shippingAddress.zipcode}, {shippingAddress.country}
							</p>
						</ListGroupItem>
						<ListGroupItem>
							<h2>Payment Method</h2>
							<p>
								<strong>Selected:</strong> {paymentMethod}
							</p>
						</ListGroupItem>
						<ListGroupItem>
							<h2>Order Items</h2>
							{cartItems.length === 0 ? (
								<p className='text-danger'>There are no items in your cart</p>
							) : (
								<ListGroup variant='flush'>
									{cartItems.map((item, index) => (
										<ListGroupItem key={index}>
											<Row>
												<Col md={2}>
													<Link to={`/product/${item.product}`}>
														<Image src={item.image} alt={item.name} fluid rounded />
													</Link>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>{item.name} </Link>
												</Col>
												<Col md={4}>
													{item.qty} x ${<CurrencyFormat value={item.price} displayType={'text'} decimalScale={2} thousandSeparator={true} />}
												</Col>
												<Col>=</Col>
												<Col> ${<CurrencyFormat value={item.qty * item.price} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</Col>
											</Row>
										</ListGroupItem>
									))}
								</ListGroup>
							)}
						</ListGroupItem>
					</ListGroup>
				</Col>
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h2>Order Summary</h2>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Items</Col>
									<Col>${<CurrencyFormat value={itemsPrice} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Shipping</Col>
									<Col>${<CurrencyFormat value={shippingPrice} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Tax</Col>
									<Col>$ {<CurrencyFormat value={taxPrice} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>
										<strong>Total</strong>
									</Col>
									<Col>
										<strong>${<CurrencyFormat value={totalPrice} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</strong>
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Button type='button' variant='success' block disabled={cartItems.length === 0 ? true : false} onClick={placeOrder}>
									Complete Purchase
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

PlaceOrderScreen.propTypes = {
	cart: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	cart: state.cart
});

export default connect(mapStateToProps)(PlaceOrderScreen);
