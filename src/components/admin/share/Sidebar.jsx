import './Sidebar.css'
import React from 'react';

class Sidebar extends React.Component {
  render() {
    return (
			<aside className="sidebar active">
				<nav>
					<ul>
						<li><a href="../categorias/index.html">Categorias</a></li>
						<li><a href="index.html" className="active">Produtos</a></li>
						<li><a href="../servicos/index.html">Serviços</a></li>
						<li><a href="../clientes/index.html">Clientes</a></li>
						<li><a href="../administradores/index.html">Administradores</a></li>
					</ul>
				</nav>
			</aside>
    );
  }
}

export default Sidebar;