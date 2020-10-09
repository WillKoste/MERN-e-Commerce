import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap';
import {addCart} from '../../actions/cart';
import CartItem from './CartItem';

const CartScreen = ({match, location, history, addCart, cart}) => {
	const prodID = match.params.id;
	const qtySearch = location.search ? +location.search.split('=')[1] : 1;

	const {cartItems} = cart;

	useEffect(() => {
		console.log(cart);
		if (prodID) {
			addCart(prodID, qtySearch);
		}
	}, [addCart, prodID, qtySearch]);

	return (
		<Fragment>
			<Link className='btn btn-dark my-3 px-4' to='/'>
				Go Back
			</Link>
			<Row>
				<Col md={8}>
					<h1 className='mb-3'>Shopping Cart</h1>
					{cartItems.length === 0 ? (
						<h2 className='text-danger text-center mt-5'>There are no items in your shopping cart!</h2>
					) : (
						<ListGroup variant='flush'>
							{cartItems.map((product) => (
								<CartItem key={product.product} product={product} />
							))}
						</ListGroup>
					)}
				</Col>
				<Col md={2}></Col>
				<Col md={2}></Col>
			</Row>
		</Fragment>
	);
};

CartScreen.propTypes = {
	addCart: PropTypes.func.isRequired,
	cart: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	cart: state.cart
});

export default connect(mapStateToProps, {addCart})(CartScreen);
