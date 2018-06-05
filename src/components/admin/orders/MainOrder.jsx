import React from 'react';
import Index from './Index'
import Detail from './Detail'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
	render (){
		return (
      <main>
        <Switch>
          <Route exact path='/admin/pedidos' component={Index}/>
          <Route exact path='/admin/pedidos/:id' component={Detail}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;
