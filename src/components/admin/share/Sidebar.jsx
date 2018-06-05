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
			path: nextProps.path.pathname.split('/')[2]
		});
	}
  render() {
    return (
			<aside className="sidebar active">
				<nav>
					<ul>
						<li><Link to="/admin" className={this.state.path === undefined ? 'active': ''}>Dashboard</Link></li>
						<li><Link to="/admin/produtos" className={this.state.path === 'produtos' ? 'active': ''}>Produtos</Link></li>
						<li><Link to="/admin/pedidos" className={this.state.path === 'pedidos' ? 'active': ''}>Pedidos</Link></li>
						<li><Link to="/admin/servicos" className={this.state.path === 'servicos' ? 'active': ''}>Serviços</Link></li>
						<li><Link to="/admin/clientes" className={this.state.path === 'clientes' ? 'active': ''}>Clientes</Link></li>
						<li><Link to="/admin/animais" className={this.state.path === 'animais' ? 'active': ''}>Animais</Link></li>
						<li><Link to="/admin/agendamentos" className={this.state.path === 'agendamentos' ? 'active': ''}>Agendamentos</Link></li>
						<li><Link to="/admin/administradores" className={this.state.path === 'administradores' ? 'active': ''}>Administradores</Link></li>
					</ul>
				</nav>
			</aside>
    );
  }
}

export default Sidebar;