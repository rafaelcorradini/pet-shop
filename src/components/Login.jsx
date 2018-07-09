import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import http from './../http';
import { Link } from 'react-router-dom';
import './Login.css';

class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let usernameInput = document.getElementsByName("username")[0];

    usernameInput.setCustomValidity("");

    this.setState({
      [name]: value
    });
	}

	handleSubmit(event) {
    event.preventDefault(); 
    let usernameInput = document.getElementsByName("username")[0];
    http.post('/login', this.state)
      .then(res => {
				if (res.status == 200) {
          localStorage.setItem('jwt', res.data.token);
          if (res.data.role == 'admin')
            this.props.history.push('/admin');
          else 
            this.props.history.push('/cliente');
				}	else {          
          usernameInput.setCustomValidity("Login ou senha inválidos.");
        }
    }).catch(() => {
      usernameInput.setCustomValidity("Erro inesperado, tente mais tarde.");
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
          <Link to = "/register" class="btn">Ainda não sou cliente</Link>
				</form>
			</section>
		);
	}
}

export default Login;
