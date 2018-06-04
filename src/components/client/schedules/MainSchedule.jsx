import React from 'react';
import Index from './Index'
import New from './New'

import Edit from './Edit'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
	render (){
		return (
      <main>
        <Switch>
          <Route exact path='/admin/agendamentos' component={Index}/>
          <Route exact path='/admin/agendamentos/novo' component={New}/>
          <Route exact path='/admin/agendamentos/:id' component={Edit}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;
