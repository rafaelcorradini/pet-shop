import React from 'react';
import model from './../../../model';
import http from './../../../http';
import { Link } from 'react-router-dom';

class Info extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      info: []
    };
  }

  componentDidMount() {
    http.get('/clients')
      .then(res => {
        this.setState({
           animals: res.data
        });
      });
  }

  render() {
    const client = this.state.clients.map((client) =>
      <tr>
        <td>{client.name}</td>
        <td>{client.email}</td>
        <td>{client.cpf}</td>
        <td>
          <Link to={'/client/animals/'+animal.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
          <button onClick={this.removeAnimal.bind(this, animal.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Animais</h1> 
        <Link to="/client/animals/edit" className="btn">Editar Dados</Link>
        <table className="content-table">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>email</th>
                    <th>CPF</th>
                </tr>
            </thead>
            <tbody>
              {client}
            </tbody>
        </table>
      </div>
    );
  }
}

export default Animals;

