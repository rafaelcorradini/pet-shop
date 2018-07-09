import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class EditAdmins extends React.Component{
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

  componentDidMount() {
    http.get('/users/'+this.props.match.params.id)
      .then(res => {
        this.setState(res.data);
      });
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
    http.put('/admins/'+this.state.id, this.state)
      .then(res => {
        this.props.history.push('/admin/administradores');
      });
  }

  render () {
    return (
      <div>
        <h1>Editar Cliente</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" autoFocus name="name" value={this.state.name} onChange={this.handleInputChange} required />
          </div>
           <div className="form-group">
            <label htmlFor="email">E-Mail</label>
            <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cpf">CPF</label>
            <input type="number" name="cpf"  value={this.state.cpf} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
          </div>
           <div className="form-group">
            <label htmlFor="passwordcheck">Confirmar Senha</label>
            <input type="password" name="passwordcheck" value={this.state.passwordcheck} onChange={this.handleInputChange} required />
          </div>

          <div className="form-group">
            <button type="submit" className="btn btn-save">Salvar</button>
            <Link to="/admin/administradores" className="btn btn-cancel">Cancelar</Link>
          </div>

        </form>
      </div>
    );
  }
}

export default EditAdmins;

