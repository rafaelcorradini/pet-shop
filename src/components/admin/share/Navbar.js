import './Navbar.css'
import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <header className="navbar">
          <section className="navbar-left">
              <a className="navbar-logo" href="..../index.html">PetShop.com</a>
              <button className="menu-button">
                  <i className="fas fa-bars"></i>
              </button>
          </section>
          
          <button className="btn-dropdown btn-user">
              Nome do usuário
              <i className="fas fa-cogs"></i>
          </button>
      </header>
    );
  }
}
export default Navbar;