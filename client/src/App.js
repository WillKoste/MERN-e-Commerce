import React, {Fragment} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomeScreen from './components/layout/HomeScreen';

const App = () => {
	return (
		<Router>
			<Fragment>
				<Header />
				<main className='py-3'>
					<Container>
						<Switch>
							<Route exact path='/' component={HomeScreen} />
						</Switch>
					</Container>
				</main>
				<Footer />
			</Fragment>
		</Router>
	);
};

export default App;
