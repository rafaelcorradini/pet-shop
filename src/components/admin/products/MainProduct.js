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
          <Route exact path='/admin/produtos' component={Index}/>
          <Route exact path='/admin/produtos/novo' component={New}/>
          <Route exact path='/admin/produtos/:id' component={Edit}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;
