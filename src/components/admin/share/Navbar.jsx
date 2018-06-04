import './Navbar.css'
import React, { Component } from 'react';

class Navbar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null
    };
    this.logout = this.logout.bind(this);
	}
	logout() {
    localStorage.removeItem('jwt');
    this.props.history.push('/login');
  }
  render() {
    return (
      <header className="navbar">
				<section className="navbar-left">
					<a className="navbar-logo" href="/">PetShop.com</a>
				</section>
				
        <div>
          <button onClick={this.logout} className="btn-dropdown btn-user">
            Logout
          </button>
        </div>
      </header>
    );
  }
}
export default Navbar;