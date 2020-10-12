import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Spinner from './Spinner';
import {register} from '../../actions/user';
import FormContainer from './FormContainer';
import {Form, FormGroup, Button, Row, Col, FormLabel, FormControl, FormText} from 'react-bootstrap';

const Register = ({register, user}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: ''
	});

	const onSubmit = (e) => {
		e.preventDefault();
	};

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	return (
		<FormContainer>
			<h1>Register Your Account</h1>
			<Form onSubmit={onSubmit}>
				<FormGroup controlId='name'>
					<FormLabel>Name</FormLabel>
					<FormControl required type='text' onChange={onChange} name='name' value={formData.name} />
				</FormGroup>
				<FormGroup controlId='email'>
					<FormLabel>Email Address</FormLabel>
					<FormControl required type='text' onChange={onChange} name='email' value={formData.email} />
				</FormGroup>
				<FormGroup controlId='password'>
					<FormLabel>Password</FormLabel>
					<FormControl required minLength={6} type='password' onChange={onChange} name='password' value={formData.password} />
				</FormGroup>
				<Button type='submit' variant='primary' className='btn btn-block mt-4'>
					Register
				</Button>
			</Form>
			<FormText className='mt-2'>
				Already have an account? Click here to
				<Link className='text-danger' to='/login'>
					{' '}
					Login!
				</Link>
			</FormText>
		</FormContainer>
	);
};

Register.propTypes = {
	user: PropTypes.object.isRequired,
	register: PropTypes.func
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps)(Register);
