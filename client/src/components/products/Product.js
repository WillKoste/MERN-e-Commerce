import React from 'react';
import {Card} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Rating from './Rating';
import CurrencyFormat from 'react-currency-format';

const Product = ({prod}) => {
	return (
		<Card className='my-3 p-3 rounded' style={{height: '90%'}}>
			<Link to={`/product/${prod.id}`}>
				<Card.Img src={prod.image} fluid='true' style={{maxHeight:'240px'}} />
			</Link>
			<Card.Body>
				<Link to={`/product/${prod.id}`}>
					<Card.Title as='div'>
						<strong className='text-secondary'>{prod.name}</strong>
					</Card.Title>
				</Link>

				<Card.Text as='div'>
					<div className='my-3'>
						<Rating value={prod.rating} prodKey={prod.id} text={`${prod.numreviews} reviews`} />
					</div>
				</Card.Text>

				<Card.Text as='h3'>${<CurrencyFormat value={prod.price} displayType={'text'} thousandSeparator={true} />}</Card.Text>
				{prod.countinstock === 0 ? <span className='text-danger'>Item Unavailable</span> : prod.countinstock > 0 && prod.countinstock <= 5 ? <span style={{color: '#CDB800'}}>Limited availability</span> : <span style={{color: '#18BE01'}}>Item in stock</span>}
			</Card.Body>
		</Card>
	);
};

export default Product;
