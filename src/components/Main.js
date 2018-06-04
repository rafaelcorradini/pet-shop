import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './Reset.css';
import Home from './Home';
import MainAdmin from './admin/MainAdmin';
import MainClient from './client/MainClient';
import Login from './Login';
import Register from './Register';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends Component {
	render() {
		return (
			<main>
				<Switch>
					<Route exact path='/' component={Login}/>
					<Route path='/admin' component={MainAdmin}/>
					<Route path='/cliente' component={MainClient}/>
					<Route path='/login' component={Login}/>
					<Route path='/register' component={Register}/>
				</Switch>
			</main>
		)
	}
}

export default Main;
