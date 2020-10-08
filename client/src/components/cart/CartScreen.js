import React from 'react';
import {connect} from 'react-redux';

const CartScreen = () => {
	return (
		<div>
			<h1>I am a cart</h1>
		</div>
	);
};

export default connect()(CartScreen);
