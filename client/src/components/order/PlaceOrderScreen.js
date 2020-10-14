import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

const PlaceOrderScreen = () => {
	return (
		<div>
			<h1>Place your gosh dang order!!!! C:</h1>
		</div>
	);
};

PlaceOrderScreen.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(PlaceOrderScreen);
