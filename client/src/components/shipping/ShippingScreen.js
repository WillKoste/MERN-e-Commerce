import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Button, FormGroup, FormControl, FormLabel} from 'react-bootstrap';
import FormContainer from '../layout/FormContainer';

const ShippingScreen = ({user, history, match, location}) => {
	const prodID = match.params.id;

	const [formData, setFormData] = useState({
		address: '',
		city: '',
		zipcode: '',
		country: ''
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
	};

	return (
		<FormContainer>
			<h1>Shipping</h1>
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
					<FormLabel>zipcode</FormLabel>
					<FormControl type='text' name='zipcode' required value={zipcode} onChange={onChange} />
				</FormGroup>
				<FormGroup controlId='country'>
					<FormLabel>country</FormLabel>
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
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(ShippingScreen);
