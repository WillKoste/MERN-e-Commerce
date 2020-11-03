import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOrderInfo, fetchOrderItems} from '../../actions/order';
import Spinner from '../layout/Spinner';
import {Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

const OrderScreen = ({getOrderInfo, fetchOrderItems, order: {loading, transNum, orderItem, orderItems, otherInfo}, match}) => {
	const orderId = match.params.id;

	useEffect(() => {
		getOrderInfo(orderId);
		fetchOrderItems(orderId);
	}, []);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1>Order {transNum}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>
								Shipping <small>{orderItem.transaction_number}</small>{' '}
							</h2>
							<p>
								<strong>Address: </strong>
								{otherInfo.address}, {otherInfo.city} {otherInfo.postal_code}, {otherInfo.country}
							</p>
						</ListGroupItem>
						<ListGroupItem>
							<h2>Payment Method</h2>
							<strong>Method: </strong>
							{orderItem.payment_method}
						</ListGroupItem>
						<ListGroupItem>
							<h2>Order Items</h2>
							<ListGroup variant='flush'>
								{orderItems.map((item, index) => (
									<ListGroupItem key={index}>
										<Row>
											<Col md={3}>
												<Image src={item.image} alt={item.name} fluid rounded />
											</Col>
											<Col>
												<Link to={`/product/${item.product_id}`}>{item.name}</Link>
											</Col>
											<Col md={3}>
												{item.qty} x ${<CurrencyFormat value={item.price} displayType={'text'} decimalScale={2} thousandSeparator={true} />}
											</Col>
										</Row>
									</ListGroupItem>
								))}
							</ListGroup>
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
									<Col>${<CurrencyFormat value={orderItem.items_price} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Shipping</Col>
									<Col>${<CurrencyFormat value={orderItem.shipping_price} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>Tax</Col>
									<Col>$ {<CurrencyFormat value={orderItem.tax_price} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Row>
									<Col>
										<strong>Total</strong>
									</Col>
									<Col>
										<strong>${<CurrencyFormat value={orderItem.total_price} displayType={'text'} decimalScale={2} thousandSeparator={true} />}</strong>
									</Col>
								</Row>
							</ListGroupItem>
							<ListGroupItem>
								<Link to='/' className='btn btn-success btn-block'>
									Go Home
								</Link>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</Fragment>
	);
};

OrderScreen.propTypes = {
	order: PropTypes.object.isRequired,
	getOrderInfo: PropTypes.func.isRequired,
	fetchOrderItems: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	order: state.order
});

export default connect(mapStateToProps, {getOrderInfo, fetchOrderItems})(OrderScreen);
