import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import http from './../http';
import { Link } from 'react-router-dom';
import './Register.css';

class Register extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      email: null,
      cpf: null,
      password: null,
      passwordcheck: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    let password = document.getElementsByName("passwordcheck")[0];

    password.setCustomValidity("");

    this.setState({
      [name]: value
    });
  
  }

  handleSubmit(event) {
    event.preventDefault();

    let password = document.getElementsByName("passwordcheck")[0];
    
    if(this.state.password != this.state.passwordcheck) {
      password.setCustomValidity("As senhas não conferem.");
      return;
    } else {
      http.put('/clients', this.state)
      .then(res => {
        this.props.history.push('/login');
      });
    }
    
  }

  render () {
    return (
      <div>
        <h1>Cadastrar Cliente</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" autoFocus name="name" value={this.state.name} onChange={this.handleInputChange} required />
          </div>
           <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input type="text" name="email" value={this.state.email} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="number" name="cpf"  value={this.state.CPF} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password"  value={this.state.password} onChange={this.handleInputChange} required />
          </div>
           <div className="form-group">
            <label htmlFor="password">Confirmar Senha</label>
            <input type="password" name="passwordcheck"  value={this.state.passwordcheck} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-save">Cadastrar</button>
            <Link to="/login" className="btn btn-cancel">Cancelar</Link>
          </div>

        </form>
      </div>
    );
  }
}

export default Register;

