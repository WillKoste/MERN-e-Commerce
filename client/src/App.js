import React, {Fragment, useEffect} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import {loadUser} from './actions/user';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './utils/PrivateRoute';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './components/layout/HomeScreen';
import ProductScreen from './components/products/ProductScreen';
import CartScreen from './components/cart/CartScreen';
import Login from './components/layout/Login';
import Register from './components/layout/Register';
import ProfileScreen from './components/profile/ProfileScreen';
import ShippingScreen from './components/shipping/ShippingScreen';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Header />
					<main className='py-3' style={{background: '#f4f4f4'}}>
						<Container className='p-4 rounded' style={{background: '#BACACB'}}>
							<Switch>
								<Route exact path='/' component={HomeScreen} />
								<Route exact path='/login' component={Login} />
								<Route exact path='/register' component={Register} />
								<Route path='/product/:id' component={ProductScreen} />
								<Route path='/cart/:id?' component={CartScreen} />
								<PrivateRoute path='/profile' component={ProfileScreen} />
								<PrivateRoute path='/shipping/:id?' component={ShippingScreen} />
							</Switch>
						</Container>
					</main>
					<Footer />
				</Fragment>
			</Router>
		</Provider>
	);
};

export default App;
