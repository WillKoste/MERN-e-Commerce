import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {logout} from '../../actions/user';

const Header = ({user: {isAuthenticated, loading, userInfo}, logout}) => {
	const onClick = () => {
		logout();
	};

	return (
		<header>
			<Navbar bg='primary' variant='dark' collapseOnSelect expand='lg' className='py-3'>
				<Container>
					<LinkContainer to='/' style={{fontSize: '1.65rem'}}>
						<Navbar.Brand>E.E.E.E.</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							{isAuthenticated ? (
								<LinkContainer to='/cart' style={{fontSize: '1rem', marginRight: '.65rem'}}>
									<Nav.Link>
										<i className='fas fa-shopping-cart mr-1'></i> Cart
									</Nav.Link>
								</LinkContainer>
							) : (
								<LinkContainer to='/register' style={{fontSize: '1rem', marginRight: '.65rem'}}>
									<Nav.Link>
										<i className='fas fa-user-alt mr-1'></i> Register
									</Nav.Link>
								</LinkContainer>
							)}
							{isAuthenticated && userInfo ? (
								<NavDropdown title={userInfo.name} id='username'>
									<LinkContainer to='/profile'>
										<NavDropdown.Item>Profile</NavDropdown.Item>
									</LinkContainer>
									<NavDropdown.Item onClick={onClick}>Logout</NavDropdown.Item>
								</NavDropdown>
							) : (
								<LinkContainer to='/login' style={{fontSize: '1rem'}}>
									<Nav.Link>Login</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

Header.propTypes = {
	user: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	user: state.user
});

export default connect(mapStateToProps, {logout})(Header);
