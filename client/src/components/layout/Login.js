import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Redirect} from 'react-router-dom';
import Spinner from './Spinner';
import {login} from '../../actions/user';
import FormContainer from './FormContainer';
import {Form, FormGroup, Button, Row, Col, FormLabel, FormControl, FormText} from 'react-bootstrap';

const Login = ({login, user: {isAuthenticated, loading, error}}) => {
	const [formData, setFormData] = useState({
		email: '',
		password: ''
	});

	const onSubmit = (e) => {
		e.preventDefault();
		login(formData.email, formData.password);
	};

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	if (isAuthenticated) {
		return <Redirect to='/' />;
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			<Form onSubmit={onSubmit}>
				<FormGroup controlId='email'>
					<FormLabel>Email Address</FormLabel>
					<FormControl type='text' onChange={onChange} required name='email' value={formData.email} />
				</FormGroup>
				<FormGroup controlId='password'>
					<FormLabel>Password</FormLabel>
					<FormControl type='password' minLength={6} onChange={onChange} name='password' value={formData.password} />
				</FormGroup>
				<Button type='submit' variant='primary' className='btn btn-block mt-4'>
					Sign In
				</Button>
			</Form>
			<FormText className='mt-2'>
				Don't have an account? Click here to
				<Link className='text-danger' to='/register'>
					{' '}
					Register!
				</Link>
			</FormText>
		</FormContainer>
	);
};

Login.propTypes = {
	user: PropTypes.object.isRequired,
	login: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, {login})(Login);
