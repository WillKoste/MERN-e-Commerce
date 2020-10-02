import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating';

const Product = ({prod}) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${prod._id}`}>
				<Card.Img src={prod.image} variant='top' />
			</Link>
			<Card.Body>
				<Link to={`/product/${prod._id}`}>
					<Card.Title as='div'>
						<strong>{prod.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<div className='my-3'>
						<Rating value={prod.rating} prodKey={prod._id} text={`${prod.numReviews} reviews`} />
					</div>
				</Card.Text>

				<Card.Text as='h3'>${prod.price}</Card.Text>
			</Card.Body>
		</Card>
	);
};

export default Product;
