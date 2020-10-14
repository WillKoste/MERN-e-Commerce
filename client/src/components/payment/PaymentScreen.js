import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Button, Col, FormGroup, FormLabel} from 'react-bootstrap';
import FormContainer from '../layout/FormContainer';
import {savePaymentInfo} from '../../actions/cart';
import CheckoutSteps from '../layout/CheckoutSteps';

const ShippingScreen = ({history, savePaymentInfo}) => {
	const [formData, setFormData] = useState({
		paymentMethod: ''
	});

	if (!localStorage.shippingInfo) {
		history.push('/shipping');
	}

	const {paymentMethod} = formData;

	const onChange = (e) => {
		setFormData({[e.target.name]: e.target.value});
	};

	const onSubmit = (e) => {
		e.preventDefault();
		savePaymentInfo(paymentMethod);
		history.push('/placeorder');
	};

	return (
		<FormContainer>
			<h1>Payment</h1>
			<CheckoutSteps step1 step2 step3 />
			<Form onSubmit={onSubmit}>
				<FormGroup controlId='paymentMethod'>
					<FormLabel as='legend'>Select Method</FormLabel>
					<Col className='mb-2 mt-3'>
						<Form.Check type='radio' label='PayPal or CreditCard' name='paymentMethod' id='PayPal' value='PayPal' onChange={onChange}></Form.Check>
					</Col>
					<Col className='mb-2'>
						<Form.Check type='radio' label='Stripe' name='paymentMethod' id='Stripe' value='Stripe' onChange={onChange}></Form.Check>
					</Col>
					<Col className='mb-2'>
						<Form.Check type='radio' label='Bitcoin' name='paymentMethod' id='Bitcoin' value='Bitcoin' onChange={onChange}></Form.Check>
					</Col>
					<Col className='mb-2'>
						<Form.Check type='radio' label='WesternUnion' name='paymentMethod' id='WesternUnion' value='WesternUnion' onChange={onChange}></Form.Check>
					</Col>
				</FormGroup>
				<Button className='py-2 mt-2' type='submit' variant='primary'>
					Continue To Checkout
				</Button>
			</Form>
		</FormContainer>
	);
};

ShippingScreen.propTypes = {
	savePaymentInfo: PropTypes.func.isRequired
};

export default connect(null, {savePaymentInfo})(ShippingScreen);
