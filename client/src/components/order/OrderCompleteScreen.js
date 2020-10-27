import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {resetSuccess} from '../../actions/order';

const OrderCompleteScreen = ({resetSuccess, order}) => {
	useEffect(() => {
		if (order.success) {
			resetSuccess();
		}
	}, [order.success]);

	return (
		<div>
			<h1>You Placed An Order! :D</h1>
			<Link to='/' className='btn btn-secondary px-3'>
				Go Home
			</Link>
		</div>
	);
};

OrderCompleteScreen.propTypes = {
	resetSuccess: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
	order: state.order
});

export default connect(mapStateToProps, {resetSuccess})(OrderCompleteScreen);
