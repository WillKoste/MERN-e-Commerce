import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Card, Image, Row, Col, ListGroupItem, Form, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {addCart} from '../../actions/cart';

const CartItem = ({product, addCart}) => {
	const onChange = (e) => {
		addCart(product.product, +e.target.value);
	};

	const removeFromCart = (e) => {
		console.log('YOU CLICKED ME!!');
	};

	return (
		<ListGroupItem>
			<Row>
				<Col md={2}>
					<Image src={product.image} alt={product.name} fluid rounded />
				</Col>
				<Col md={3}>
					<Link className='text-secondary' to={`/product/${product.product}`}>
						{product.name}{' '}
					</Link>
				</Col>
				<Col md={2}>${product.price}</Col>
				<Col md={3}>
					<Form.Control as='select' onChange={onChange}>
						{[...Array(product.countinstock).keys()].map((val) => (
							<option key={val + 1} value={val + 1}>
								{val + 1}{' '}
							</option>
						))}
					</Form.Control>
				</Col>
				<Col md={2}>
					<Button type='button' variant='danger' onClick={removeFromCart}>
						<i className='fas fa-trash fa-2x'></i>
					</Button>
				</Col>
			</Row>
		</ListGroupItem>
	);
};

CartItem.propTypes = {
	addCart: PropTypes.func.isRequired,
	product: PropTypes.object
};

export default connect(null, {addCart})(CartItem);
