import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class NewAdmin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      username: null,
      email: null,
      cpf: null,
      phone: null,
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

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault(); 

    let data = {};
    Object.assign(data, this.state);
    delete data.categories;
  
    http.post('/admins', data)
      .then(res => {
        this.props.history.push('/admin/administrador');
      });
  }

  

  render () {
    return (
      <div>
        <h1>Cadastrar Administrador</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" autoFocus name="name" value={this.state.username} onChange={this.handleInputChange} required />
          </div>
           <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input type="text" autoFocus name="email" value={this.state.email} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="number" autoFocus name="cpf"  value={this.state.CPF} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input type="number" autoFocus name="phone"  value={this.state.phone} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" autoFocus name="password"  value={this.state.password} onChange={this.handleInputChange} required />
          </div>
           <div className="form-group">
            <label htmlFor="password">Confirmar Senha</label>
            <input type="password" autoFocus name="passwordcheck"  value={this.state.passwordcheck} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-save">Salvar</button>
            <Link to="/admin/administrador" className="btn btn-cancel">Cancelar</Link>
          </div>

        </form>
      </div>
    );
  }
}

export default NewAdmin;

