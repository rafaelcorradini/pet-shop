import './Navbar.css'
import React, { Component } from 'react';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
		};
	}
	componentDidMount() {
    // http.get('/admins/'+window.localStorage('user_'))
    //   .then(res => {
    //     this.setState({
    //        clients: res.data
    //     });
    //   });
  }
  render() {
    return (
      <header className="navbar">
				<section className="navbar-left">
					<a className="navbar-logo" href="..../index.html">PetShop.com</a>
				</section>
				
				<button className="btn-dropdown btn-user">
					
					<i className="fas fa-cogs"></i>
				</button>
      </header>
    );
  }
}
export default Navbar;