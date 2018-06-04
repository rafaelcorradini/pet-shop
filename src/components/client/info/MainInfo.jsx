import React from 'react';
import Index from './Index'
import New from './New'

import EditInfo from './Edit'
import { Switch, Route } from 'react-router-dom';

class Main extends React.Component{
	render (){
		return (
      <main>
        <Switch>
          <Route exact path='/client/info' component={Index}/>
          <Route exact path='/client/info/novo' component={New}/>
          <Route exact path='/client/info/:id' component={EditInfo}/>
        </Switch>
      </main>
			
			);
		}
	}

export default Main;