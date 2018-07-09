import React from 'react';
import './MainClient.css';
import Navbar from './share/Navbar'
import Sidebar from './share/Sidebar'
import Dashboard from './Dashboard'
import Animals from './animals/MainAnimal'
import Schedules from './schedules/MainSchedule'
import Info from './info/MainInfo'
import Orders from './orders/MainOrder'
/*import Clients from './clients/MainClient'
import Categories from './categories/MainCategory'
import Admin from './administrador/MainAdministrador'*/
import model from './../../model'

import { Switch, Route } from 'react-router-dom';

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class MainClient extends React.Component{
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		model.auth('client').then((res) => {
			if (res == false)
				this.props.history.push('/login');
		});		
  }
	render (){
		return (
			<div>
    			<Navbar history={this.props.history}/>
   				<div className='container'>
					<Sidebar path={this.props.location}/>
   				 	<section className='content'>
   				 		<section className='wrapper'>
								<main>
									<Switch>
										<Route exact path='/cliente' component={Dashboard}/>
										<Route path='/cliente/animais' component={Animals}/>
										<Route path='/cliente/agendamentos' component={Schedules}/>
										<Route path='/cliente/pedidos' component={Orders}/>
										<Route path='/cliente/info' component={Info}/>
									</Switch>
								</main>
    					</section>
    				</section>
    			</div>
			</div>
			
			);
		}
	}

export default MainClient;
