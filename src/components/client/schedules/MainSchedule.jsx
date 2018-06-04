import React from 'react';
import Index from './Index'

import Edit from './Edit'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
	render (){
		return (
      <main>
        <Switch>
          <Route exact path='/cliente/agendamentos' component={Index}/>
          <Route exact path='/cliente/agendamentos/:id' component={Edit}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;
