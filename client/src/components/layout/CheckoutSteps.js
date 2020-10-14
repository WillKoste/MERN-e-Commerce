import React from 'react';
import {Nav, NavLink} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const CheckoutSteps = ({step1, step2, step3, step4}) => {
	return (
		<Nav className='justify-content-center mb-4'>
			<Nav.Item className='mr-3'>
				{step1 ? (
					<LinkContainer to='/login'>
						<NavLink>Sign In</NavLink>
					</LinkContainer>
				) : (
					<NavLink disabled className='mr-3'>
						Sign In
					</NavLink>
				)}
			</Nav.Item>
			<Nav.Item className='mr-3'>
				{step2 ? (
					<LinkContainer to='/shipping'>
						<NavLink>Shipping</NavLink>
					</LinkContainer>
				) : (
					<NavLink className='mr-3' disabled>
						Shipping
					</NavLink>
				)}
			</Nav.Item>
			<Nav.Item className='mr-3'>
				{step3 ? (
					<LinkContainer to='/payment'>
						<NavLink>Payment</NavLink>
					</LinkContainer>
				) : (
					<NavLink className='mr-3' disabled>
						Payment
					</NavLink>
				)}
			</Nav.Item>
			<Nav.Item className='mr-3'>
				{step4 ? (
					<LinkContainer to='/placeorder'>
						<NavLink>Place</NavLink>
					</LinkContainer>
				) : (
					<NavLink className='mr-3' disabled>
						Place
					</NavLink>
				)}
			</Nav.Item>
		</Nav>
	);
};

export default CheckoutSteps;
