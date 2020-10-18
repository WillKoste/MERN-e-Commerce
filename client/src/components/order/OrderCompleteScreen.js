import React from 'react';
import {Link} from 'react-router-dom';

const OrderCompleteScreen = () => {
	return (
		<div>
			<h1>You Placed An Order! :D</h1>
			<Link to='/' className='btn btn-secondary px-3'>
				Go Home
			</Link>
		</div>
	);
};

export default OrderCompleteScreen;
