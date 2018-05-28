import React from 'react';
import model from './../../../model';
import http from './../../../http';
import { Link } from 'react-router-dom';

class Admin extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      admins: []
    };
  }

  componentDidMount() {
    http.get('/admins')
      .then(res => {
        this.setState({
           admins: res.data
        });
      });
  }

  removeAdmin(id) {
    model.removeById(id, 'admins');
    this.componentDidMount();
  }

  render() {
    const admins = this.state.admins.map((admin) =>
      <tr>
        <td>{admin.id}</td>
        <td>{admin.username}</td>
        <td>{admin.cpf}</td>
        <td>
          <Link to={'/admin/administrador/'+admin.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
          <button onClick={this.removeAdmin.bind(this, admin.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Administrador</h1> 
        <Link to="/admin/administrador/novo" className="btn btn-save btn-new">Cadastrar novo</Link>
        <table className="content-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>CPF</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
              {admins}
            </tbody>
        </table>
      </div>
    );
  }
}

export default Admin;

