import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import FormContainer from '../layout/FormContainer';
import {saveShippingInfo} from '../../actions/cart';
import {createShippingAddress} from '../../actions/order';
import CheckoutSteps from '../layout/CheckoutSteps';

const ShippingScreen = ({user, cart: {shippingAddress}, history, match, saveShippingInfo, createShippingAddress}) => {
	const prodID = match.params.id;

	const [formData, setFormData] = useState({
		address: shippingAddress.address,
		city: shippingAddress.city,
		zipcode: shippingAddress.zipcode,
		country: shippingAddress.country
	});

	const {address, city, zipcode, country} = formData;

	useEffect(() => {
		if (prodID) {
			history.push('/shipping');
		}
	}, [prodID, history]);

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		saveShippingInfo({address, city, zipcode, country});
		createShippingAddress(address, city, zipcode, country, user.userInfo.id);
		history.push('/payment');
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>
			<CheckoutSteps step1 step2 />
			<Form onSubmit={onSubmit}>
				<FormGroup controlId='address'>
					<FormLabel>Address</FormLabel>
					<FormControl type='text' name='address' required value={address} onChange={onChange} />
				</FormGroup>
				<FormGroup controlId='city'>
					<FormLabel>City</FormLabel>
					<FormControl type='text' name='city' required value={city} onChange={onChange} />
				</FormGroup>
				<FormGroup controlId='zipcode'>
					<FormLabel>Zipcode</FormLabel>
					<FormControl type='text' name='zipcode' required value={zipcode} onChange={onChange} />
				</FormGroup>
				<FormGroup controlId='country'>
					<FormLabel>Country</FormLabel>
					<FormControl type='text' name='country' required value={country} onChange={onChange} />
				</FormGroup>
				<Button className='py-2 mt-2' type='submit' variant='primary'>
					Continue To Checkout
				</Button>
			</Form>
		</FormContainer>
	);
};

ShippingScreen.propTypes = {
	user: PropTypes.object.isRequired,
	cart: PropTypes.object.isRequired,
	saveShippingInfo: PropTypes.func.isRequired,
	createShippingAddress: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user,
	cart: state.cart
});

export default connect(mapStateToProps, {saveShippingInfo, createShippingAddress})(ShippingScreen);
