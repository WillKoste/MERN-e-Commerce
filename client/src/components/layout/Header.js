import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
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
							<LinkContainer to='/cart' style={{fontSize: '1rem', marginRight: '.65rem'}}>
								<Nav.Link>
									<i className='fas fa-shopping-cart mr-1'></i> Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to='/login' style={{fontSize: '1rem'}}>
								<Nav.Link>Login</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
