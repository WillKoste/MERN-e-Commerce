import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Row, Col, ListGroup, Card, ListGroupItem, Button} from 'react-bootstrap';
import {addCart} from '../../actions/cart';
import CartItem from './CartItem';
import CurrencyFormat from 'react-currency-format';

const CartScreen = ({match, location, history, addCart, cart}) => {
	const prodID = match.params.id;
	const qtySearch = location.search ? +location.search.split('=')[1] : 1;

	const {cartItems} = cart;

	useEffect(() => {
		if (prodID) {
			addCart(prodID, qtySearch);
			history.push('/cart');
		}
	}, [addCart, prodID, qtySearch, history]);

	const checkoutCart = () => {
		history.push(`/shipping`);
	};

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
				<Col md={4}>
					<Card>
						<ListGroup variant='flush'>
							<ListGroupItem>
								<h2>Subtotal ({cartItems.reduce((a, b) => a + b.qty, 0)}) items</h2>${<CurrencyFormat thousandSeparator={true} displayType={'text'} value={cartItems.reduce((a, b) => a + b.qty * b.price, 0).toFixed(2)} />}
							</ListGroupItem>
							<ListGroupItem>
								<Button type='button' className='btn btn-block' disabled={cartItems.length === 0} onClick={checkoutCart}>
									Check Out
								</Button>
							</ListGroupItem>
						</ListGroup>
					</Card>
				</Col>
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
