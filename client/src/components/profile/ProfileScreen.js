import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, FormGroup, Button, Row, Col, FormLabel, FormControl, FormText} from 'react-bootstrap';
import {loadUser} from '../../actions/user';

const ProfileScreen = ({user: {isAuthenticated, userInfo}}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
		password2: ''
	});

	const {name, email, password, password2} = formData;

	useEffect(() => {
		if (isAuthenticated) {
			setFormData({...formData, name: userInfo.name, email: userInfo.email});
		}
	}, []);

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		if (password !== password2) {
			alert('Passwords do not match, please try again');
		} else {
			// DISPATCH UPDATE USER //
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				<Form onSubmit={onSubmit}>
					<FormGroup controlId='name'>
						<FormLabel>Name</FormLabel>
						<FormControl required type='text' onChange={onChange} name='name' value={name} />
					</FormGroup>
					<FormGroup controlId='email'>
						<FormLabel>Email Address</FormLabel>
						<FormControl required type='text' onChange={onChange} name='email' value={email} />
					</FormGroup>
					<FormGroup controlId='password'>
						<FormLabel>Password</FormLabel>
						<FormControl required minLength={6} type='password' onChange={onChange} name='password' value={password} />
					</FormGroup>
					<FormGroup controlId='password2'>
						<FormLabel>Confirm Password</FormLabel>
						<FormControl required minLength={6} type='password' onChange={onChange} name='password2' value={password2} />
					</FormGroup>
					<Button type='submit' variant='primary' className='btn btn-block mt-4'>
						Update
					</Button>
				</Form>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
			</Col>
		</Row>
	);
};

ProfileScreen.propTypes = {
	user: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, {loadUser})(ProfileScreen);
