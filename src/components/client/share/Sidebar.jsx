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
						<li><Link to="/client" className={this.state.path === undefined ? 'active': ''}>Dashboard</Link></li>
						<li><Link to="/client/animals" className={this.state.path === 'animals' ? 'active': ''}>Animais</Link></li>
						<li><Link to="/client/schedule" className={this.state.path === 'schedule' ? 'active': ''}>Realizar Agendamento</Link></li>
					</ul>
				</nav>
			</aside>
    );
  }
}

export default Sidebar;