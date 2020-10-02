import React, {Fragment} from 'react';
import './App.css';
import {Container} from 'react-bootstrap';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
	return (
		<Fragment>
			<Header />
			<main className='py-3'>
				<Container>
					<h1>Default Text</h1>
				</Container>
			</main>
			<Footer />
		</Fragment>
	);
};

export default App;
