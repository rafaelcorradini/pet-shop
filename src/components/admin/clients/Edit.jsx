import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class EditClients extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      username: null,
      email: null,
      cpf: null,
      password: 'admin'
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

  this.setState({
    [name]: value
  });

}

  handleSubmit(event) {
    event.preventDefault();

    http.put('/users/'+this.state.id, this.state)
      .then(res => {
        this.props.history.push('/admin/clientes');
      });
  }

  render () {
    return (
      <div>
        <h1>Editar Cliente</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Nome</label>
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
            <input type="number" name="cpf"  value={this.state.cpf} onChange={this.handleInputChange} required />
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

export default EditClients;

