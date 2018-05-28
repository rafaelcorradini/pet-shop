import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import http from './../http';
import './Login.css';

class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
	}

	handleSubmit(event) {
    event.preventDefault(); 
  
    http.get('/admins?username='+this.state.username+'&?password='+this.state.password)
      .then(res => {
				if (res.data.length > 0) {
					localStorage.setItem('jwt', JSON.stringify(res.data[0]));
					this.props.history.push('/admin');
				}	
      });
  }
	
	render() {
		return (
			<section className="login">
				<h1>Login</h1>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="username" autoFocus value={this.state.username} onChange={this.handleInputChange} required placeholder="Usuário" />
					<input type="password" name="password" autoFocus value={this.state.password} onChange={this.handleInputChange} required placeholder="Senha" />
					<button type="submit" class="btn">Entrar</button>
				</form>
			</section>
		);
	}
}

export default Login;
