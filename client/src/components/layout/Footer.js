import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';

const Footer = () => {
	return (
		<footer className='bg-light mt-4'>
			<Container>
				<Row>
					<Col className='text-center py-3'>Copyright &copy; Economical E-Commerce Equestricare Emporium, 2020</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
