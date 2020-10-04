import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating';

const Product = ({prod}) => {
	return (
		<Card className='my-3 p-3 rounded'>
			<Link to={`/product/${prod._id}`}>
				<Card.Img src={prod.image} style={{width: '221px', height: '176px'}} fluid />
			</Link>
			<Card.Body>
				<Link to={`/product/${prod._id}`}>
					<Card.Title as='div'>
						<strong className='text-secondary'>{prod.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<div className='my-3'>
						<Rating value={prod.rating} prodKey={prod._id} text={`${prod.numReviews} reviews`} />
					</div>
				</Card.Text>

				<Card.Text as='h3'>${prod.price}</Card.Text>
				{prod.countInStock === 0 && <span className='text-danger'>Out of stock</span>}
			</Card.Body>
		</Card>
	);
};

export default Product;
