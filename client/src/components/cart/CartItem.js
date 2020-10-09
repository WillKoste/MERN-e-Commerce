import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, Image, Row, Col, ListGroupItem, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {addCart, removeCart} from '../../actions/cart';

const CartItem = ({product, addCart, removeCart}) => {
	const onChange = (e) => {
		addCart(product.product, +e.target.value);
	};

	const removeFromCart = (e) => {
		// console.log(product);
		removeCart(product.product);
	};

	return (
		<ListGroupItem style={{padding: '1rem'}}>
			<Row>
				<Col md={2}>
					<Image src={product.image} alt={product.name} fluid rounded style={{maxHeight: '100px'}} />
				</Col>
				<Col md={3}>
					<Link className='text-secondary' to={`/product/${product.product}`}>
						{product.name}{' '}
					</Link>
				</Col>
				<Col md={2}>${product.price}</Col>
				<Col md={3}>
					<Form.Control as='select' value={product.qty} onChange={onChange}>
						{[...Array(product.countinstock).keys()].map((val) => (
							<option key={val + 1} value={val + 1}>
								{val + 1}{' '}
							</option>
						))}
					</Form.Control>
				</Col>
				<Col md={2}>
					<Button type='button' variant='danger' onClick={removeFromCart}>
						<i className='fas fa-trash' style={{fontSize: '.8rem'}}></i>
					</Button>
				</Col>
			</Row>
		</ListGroupItem>
	);
};

CartItem.propTypes = {
	addCart: PropTypes.func.isRequired,
	removeCart: PropTypes.func.isRequired,
	product: PropTypes.object
};

export default connect(null, {addCart, removeCart})(CartItem);
