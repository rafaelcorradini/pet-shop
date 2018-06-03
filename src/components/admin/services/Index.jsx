import React from 'react';
import model from './../../../model';
import http from './../../../http';
import { Link } from 'react-router-dom';

class Services extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      services: []
    };
  }

  componentDidMount() {
    http.get('/services')
      .then(res => {
        this.setState({
          services: res.data
        });
      });
  }

  removeService(id) {
    model.removeById(id, 'services').then(() => {
      this.componentDidMount();
    });
    
  }

  render() {
    const services = this.state.services.map((service) =>
      <tr>
        <td>{service.id}</td>
        <td>{service.name}</td>
        <td>{service.description}</td>
        <td>
          <Link to={'/admin/servicos/'+service.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
          <button onClick={this.removeService.bind(this, service.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Serviços</h1> 
        <Link to="/admin/servicos/novo" className="btn btn-save btn-new">Cadastrar novo</Link>
        <table className="content-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Descrição</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
              {services}
            </tbody>
        </table>
      </div>
    );
  }
}

export default Services;

