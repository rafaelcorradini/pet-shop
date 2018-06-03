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
          <Route exact path='/admin/administradores' component={Index}/>
          <Route exact path='/admin/administradores/novo' component={New}/>
          <Route exact path='/admin/administradores/:id' component={Edit}/>
        </Switch>
      </main>
      
      );
    }
  }

export default Main;
