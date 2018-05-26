import React from 'react';

import './MainAdmin.css';
import Navbar from './share/Navbar'
import Sidebar from './share/Sidebar'
import Dashboard from './Dashboard'
import Products from './products/MainProduct'
import { Switch, Route } from 'react-router-dom';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class MainAdmin extends React.Component{
	render (){
		return (
			<div>
    			<Navbar/>
   				<div className='container'>
					 	<Sidebar/>
   				 	<section className='content'>
   				 		<section className='wrapper'>
								<main>
									<Switch>
										<Route exact path='/admin' component={Dashboard}/>
										<Route exact path='/admin/produtos' component={Products}/>
									</Switch>
								</main>
    					</section>
    				</section>
    			</div>
			</div>
			
			);
		}
	}

export default MainAdmin;
