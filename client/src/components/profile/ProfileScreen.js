import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Form, FormGroup, Button, Row, Col, FormLabel, FormControl} from 'react-bootstrap';
import {updateProfile} from '../../actions/user';

const ProfileScreen = ({user: {isAuthenticated, userInfo, updateSuccess}, updateProfile}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: ''
	});

	const {name, email} = formData;

	useEffect(() => {
		if (isAuthenticated) {
			setFormData({...formData, name: userInfo.name, email: userInfo.email});
		}
	}, [isAuthenticated, userInfo]);

	const onChange = (e) => {
		setFormData({...formData, [e.target.name]: e.target.value});
	};

	const onSubmit = (e) => {
		e.preventDefault();

		updateProfile({
			id: userInfo.id,
			name,
			email,
			isadmin: userInfo.isadmin,
			created_at: userInfo.created_at
		});

		if (updateSuccess) {
			alert('Update was successfull');
		} else {
			alert('Update was not successfull');
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
	user: PropTypes.object.isRequired,
	updateProfile: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, {updateProfile})(ProfileScreen);
