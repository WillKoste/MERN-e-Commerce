import React, {Fragment} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './components/layout/HomeScreen';
import ProductScreen from './components/products/ProductScreen';

const App = () => {
	return (
		<Router>
			<Fragment>
				<Header />
				<main className='py-3'>
					<Container className='p-4' style={{background: '#7BDFF7'}}>
						<Switch>
							<Route exact path='/' component={HomeScreen} />
							<Route path='/product/:id' component={ProductScreen} />
						</Switch>
					</Container>
				</main>
				<Footer />
			</Fragment>
		</Router>
	);
};

export default App;
