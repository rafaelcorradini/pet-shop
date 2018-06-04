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
          <Route exact path='/client/schedules' component={Index}/>
          <Route exact path='/client/schedules/novo' component={New}/>
          <Route exact path='/client/schedules/:id' component={Edit}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;
