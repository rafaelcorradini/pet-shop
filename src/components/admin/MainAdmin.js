import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import './MainAdmin.css';
import Navbar from './share/Navbar'
import Container from './share/Container'
import Sidebar from './share/Sidebar'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component{
	render (){
		return (
			<div>
				<Navbar/>
				<Sidebar/>
				<div className = 'container'>

    				<Switch>
      					<Route exact path='/admin' component={Dashboard}/>
    				</Switch>
  				</div>
			</div>
			
			);
		}
	}

export default Main;
