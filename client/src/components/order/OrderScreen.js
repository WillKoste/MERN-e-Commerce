import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getOrderInfo} from '../../actions/order';
import Spinner from '../layout/Spinner';
import {Button, Row, Col, ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap';

const OrderScreen = ({getOrderInfo, order: {loading, transNum, orderItem, otherInfo}, match}) => {
	const orderId = match.params.id;

	useEffect(() => {
		getOrderInfo(orderId);
	}, []);

	return loading ? (
		<Spinner />
	) : (
		<Fragment>
			<h1>Order {transNum}</h1>
			<Row>
				<Col md={10}>
					<ListGroup variant='flush'>
						<ListGroupItem>
							<h2>
								Shipping <small>{orderItem.transaction_number}</small>{' '}
							</h2>
							<p>{otherInfo.name} </p>
						</ListGroupItem>
					</ListGroup>
				</Col>
			</Row>
		</Fragment>
	);
};

OrderScreen.propTypes = {
	order: PropTypes.object.isRequired,
	getOrderInfo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	order: state.order
});

export default connect(mapStateToProps, {getOrderInfo})(OrderScreen);
