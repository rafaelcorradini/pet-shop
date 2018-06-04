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
          <Route exact path='/cliente/animais' component={Index}/>
          <Route exact path='/cliente/animais/novo' component={New}/>
          <Route exact path='/cliente/animais/:id' component={Edit}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;
