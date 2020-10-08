import React, {Fragment} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './components/layout/HomeScreen';
import ProductScreen from './components/products/ProductScreen';
import CartScreen from './components/cart/CartScreen';
import Login from './components/layout/Login';

const App = () => {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Header />
					<main className='py-3' style={{background: '#f4f4f4'}}>
						<Container className='p-4 rounded' style={{background: '#84D6E3'}}>
							<Switch>
								<Route exact path='/' component={HomeScreen} />
								<Route exact path='/login' component={Login} />
								<Route path='/product/:id' component={ProductScreen} />
								<Route path='/cart/:id' component={CartScreen} />
								<Route path='/cart/' component={CartScreen} />
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
