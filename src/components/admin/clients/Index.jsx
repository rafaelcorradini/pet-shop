import React from 'react';
import model from './../../../model';
import http from './../../../http';
import { Link } from 'react-router-dom';

class Clients extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      clients: []
    };
  }

  componentDidMount() {
    http.get('/clients')
      .then(res => {
        this.setState({
           clients: res.data
        });
      });
  }

  removeClient(id) {
    model.removeById(id, 'clients').then(() => {
      this.componentDidMount();
    });
  }

  render() {
    const clients = this.state.clients.map((client) =>
      <tr>
        <td>{client.id}</td>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.cpf}</td>
        <td>
          <Link to={'/admin/clientes/'+client.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
          <button onClick={this.removeClient.bind(this, client.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Clientes</h1> 
        <Link to="/admin/clientes/novo" className="btn btn-save btn-new">Cadastrar novo</Link>
        <table className="content-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>E-mail</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
              {clients}
            </tbody>
        </table>
      </div>
    );
  }
}

export default Clients;

