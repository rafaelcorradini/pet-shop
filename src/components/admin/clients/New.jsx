import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class ProductNew extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      username: null,
      email: null,
      cpf: null,
      password: null,
      passwordcheck: null,
      role: 'client'
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
      password.setCustomValidity("");
    }
    delete this.state.passwordcheck;
    http.post('/users', this.state)
      .then(res => {
        this.props.history.push('/admin/clientes');
      });
  }

  

  render () {
    return (
      <div>
        <h1>Cadastrar Cliente</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Usuário</label>
            <input type="text" autoFocus name="username" value={this.state.username} onChange={this.handleInputChange} required />
          </div>
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
            <button type="submit" className="btn btn-save">Salvar</button>
            <Link to="/admin/clientes" className="btn btn-cancel">Cancelar</Link>
          </div>

        </form>
      </div>
    );
  }
}

export default ProductNew;

