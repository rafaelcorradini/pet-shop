import React from 'react';
import './MainAdmin.css';
import Navbar from './share/Navbar'
import Sidebar from './share/Sidebar'
import Dashboard from './Dashboard'
import Products from './products/MainProduct'
import Services from './services/MainService'
import Clients from './clients/MainClient'
import Admin from './admins/MainAdministrador'
import Schedules from './schedules/MainSchedule'
import Animals from './animals/MainAnimal'
import model from './../../model'

import { Switch, Route } from 'react-router-dom';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class MainAdmin extends React.Component{
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		if (!model.auth())
			this.props.history.push('/login');
  }
	render (){
		return (
			<div>
    			<Navbar/>
   				<div className='container'>
					<Sidebar path={this.props.location}/>
   				 	<section className='content'>
   				 		<section className='wrapper'>
								<main>
									<Switch>
										<Route exact path='/admin' component={Dashboard}/>
										<Route path='/admin/produtos' component={Products}/>
										<Route path='/admin/agendamento' component={Schedules}/>
										<Route path='/admin/servicos' component={Services}/>
										<Route path='/admin/clientes' component={Clients}/>
										<Route path='/admin/animais' component={Animals}/>
										<Route path='/admin/administradores' component={Admin}/>
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
