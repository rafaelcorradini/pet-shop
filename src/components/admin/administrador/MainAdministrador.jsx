import React from 'react';
import Index from './Index'
import New from './New'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
  render (){
    return (
      <main>
        <Switch>
          <Route exact path='/admin/administrador' component={Index}/>
          <Route exact path='/admin/administrador/novo' component={New}/>
        </Switch>
      </main>
      
      );
    }
  }

export default Main;
