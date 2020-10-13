import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, Button} from 'react-bootstrap';
import FormContainer from '../layout/FormContainer';

const ShippingScreen = ({user, history}) => {
	const [formDate, setFormData] = useState({
		address: '',
		city: '',
		zipcode: '',
		country: ''
	});

	return (
		<div>
			<h1>I like to ship</h1>
		</div>
	);
};

ShippingScreen.propTypes = {
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(ShippingScreen);
