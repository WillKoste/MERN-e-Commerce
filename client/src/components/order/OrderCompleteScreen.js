import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {resetSuccess} from '../../actions/order';

const OrderCompleteScreen = ({resetSuccess}) => {
	return (
		<div>
			<h1>You Placed An Order! :D</h1>
			<Link to='/' onClick={() => resetSuccess()} className='btn btn-secondary px-3'>
				Go Home
			</Link>
		</div>
	);
};

OrderCompleteScreen.propTypes = {
	resetSuccess: PropTypes.func.isRequired
};

export default connect(null, {resetSuccess})(OrderCompleteScreen);
