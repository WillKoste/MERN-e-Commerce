import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, user: {isAuthenticated, loading}, ...rest}) => {
	return <Route {...rest} render={(props) => (!isAuthenticated && !loading ? <Redirect to='login' /> : <Component {...props} />)} />;
};

PrivateRoute.propTypes = {
	user: PropTypes.object.isRequired
};

const mapStatToProps = (state) => ({
	user: state.user
});

export default connect(mapStatToProps)(PrivateRoute);
