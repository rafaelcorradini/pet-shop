import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './Reset.css';
import Home from './Home';
import MainAdmin from './admin/MainAdmin';

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
					<Route exact path='/' component={Home}/>
					<Route exact path='/admin' component={MainAdmin}/>
				</Switch>
			</main>
		)
	}
}

export default Main;
