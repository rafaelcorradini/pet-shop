import React from 'react';
import Edit from './Edit'

import EditInfo from './Edit'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
	render (){
		return (
      <main>
        <Switch>
          <Route exact path='/cliente/info' component={Edit}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;