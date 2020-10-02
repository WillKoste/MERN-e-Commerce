import React from 'react';
import {Nav, Navbar, Container} from 'react-bootstrap';

const Header = () => {
	return (
		<header>
			<Navbar bg='dark' variant='dark' collapseOnSelect expand='lg' className='py-3'>
				<Container>
					<Navbar.Brand href='/'>E.E.E.E.</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className='ml-auto'>
							<Nav.Link href='/cart'>
								<i className='fas fa-shopping-cart mr-1'></i> Cart
							</Nav.Link>
							<Nav.Link href='/login'>Sign In</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
