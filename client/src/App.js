import React from 'react';
import './App.css';

import Navbar from './components/layout/Navbar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

const App = () => {
	return (
		<div className='App'>
			<Header />
			<Navbar />
			<h1 className='text-primary'>Ding Dong</h1>
			<h2 className='text-secondary'>Poo Pong</h2>
			<Footer />
		</div>
	);
};

export default App;
