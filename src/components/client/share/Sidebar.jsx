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
						<li><Link to="/cliente" className={this.state.path === undefined ? 'active': ''}>Dashboard</Link></li>
						<li><Link to="/cliente/animais" className={this.state.path === 'animais' ? 'active': ''}>Animais</Link></li>
						<li><Link to="/cliente/agendamentos" className={this.state.path === 'agendamentos' ? 'active': ''}>Realizar Agendamento</Link></li>
						<li><Link to="/cliente/info" className={this.state.path === 'info' ? 'active': ''}>Editar cadastro</Link></li>
					</ul>
				</nav>
			</aside>
    );
  }
}

export default Sidebar;