import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import './MainAdmin.css';
import Navbar from './share/Navbar'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class MainAdmin extends Component {
	render() {
		return (
			<main>
				<Navbar />
				<Switch>
				  <Route exact path='/admin' component={Dashboard}/>
				</Switch>
			</main>
		)
	}
}

export default MainAdmin
