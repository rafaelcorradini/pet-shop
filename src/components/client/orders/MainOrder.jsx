import React from 'react';
import Index from './Index'
import New from './New'
import Detail from './Detail'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
	render (){
		return (
      <main>
        <Switch>
          <Route exact path='/cliente/pedidos' component={Index}/>
          <Route exact path='/cliente/pedidos/novo' component={New}/>
          <Route exact path='/cliente/pedidos/:id' component={Detail}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;
