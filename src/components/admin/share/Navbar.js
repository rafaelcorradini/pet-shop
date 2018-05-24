import React, { PureComponent } from 'react';
import './Navbar.css';

class Header extends PureComponent {
  render() {
    return (
      <header id="navbar">
        <section id="navbar-left">
            <a id="navbar-logo" href="#">PetShop.com</a>
            <button id="menu-button" onclick="toggleMenu()">
                <i class="fas fa-bars"></i>
            </button>
        </section>
        
        <button id="btn-user" class="btn-dropdown">
            Nome do usuário
            <i class="fas fa-cogs"></i>
        </button>
      </header>
    );
  }
}
export default Header;