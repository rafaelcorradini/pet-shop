import React from 'react';
import Index from './Index'
import New from './New'

import EditServices from './EditServices'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
	render (){
		return (
      <main>
        <Switch>
          <Route exact path='/admin/servicos' component={Index}/>
          <Route exact path='/admin/servicos/novo' component={New}/>
          <Route exact path='/admin/servicos/:id' component={EditServices}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;
