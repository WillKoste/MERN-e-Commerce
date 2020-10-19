import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

const OrderCompleteScreen = ({order}) => {
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
	order: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
	order: state.order
});

export default connect(mapStateToProps)(OrderCompleteScreen);
