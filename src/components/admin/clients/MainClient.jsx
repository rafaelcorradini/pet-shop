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
          <Route exact path='/admin/clientes' component={Index}/>
          <Route exact path='/admin/clientes/novo' component={New}/>
          <Route exact path='/admin/clientes/:id' component={Edit}/>
        </Switch>
      </main>
      
      );
    }
  }

export default Main;
