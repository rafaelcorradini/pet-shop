import './Sidebar.css'
import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			path: props.path.pathname.split('/')[2]
		};
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			path: this.props.path.pathname.split('/')[2]
		});
	}
  render() {
    return (
			<aside className="sidebar active">
				<nav>
					<ul>
						<li><Link to="/admin" className={this.state.path === '' ? 'active': ''}>Dashboard</Link></li>
						<li><Link to="/admin/categorias" className={this.state.path === 'categorias' ? 'active': ''}>Categorias</Link></li>
						<li><Link to="/admin/produtos" className={this.state.path === 'produtos' ? 'active': ''}>Produtos</Link></li>
						<li><Link to="/admin/servicos" className={this.state.path === 'servicos' ? 'active': ''}>Serviços</Link></li>
						<li><Link to="/admin/clients" className={this.state.path === 'clients' ? 'active': ''}>Clientes</Link></li>
						<li><Link to="/admin/administrador" className={this.state.path === 'administrador' ? 'active': ''}>Administradores</Link></li>
					</ul>
				</nav>
			</aside>
    );
  }
}

export default Sidebar;