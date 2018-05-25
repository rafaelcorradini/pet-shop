import React from 'react';

import './MainAdmin.css';
import Navbar from './share/Navbar'
import Sidebar from './share/Sidebar'
import Form from './share/Form'

// The Main component renders one of the three provided
// Routes (provided that one matches). Both the /roster
// and /schedule routes will match any pathname that starts
// with /roster or /schedule. The / route will only match
// when the pathname is exactly the string "/"
class Main extends React.Component{
	render (){
		return (
			<div>
    			<Navbar/>
    			<Sidebar/>
   				 <div className = 'container'>
   				 	
   				 	<section className = 'content'>
   				 		<section className ='wrapper'>
   				 			<Form/>
    					</section>
    				</section>
    			</div>
			</div>
			
			);
		}
	}

export default Main;
