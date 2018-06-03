import React from 'react';
import model from './../../../model';
import http from './../../../http';
import { Link } from 'react-router-dom';

class Animals extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      animals: []
    };
  }

  componentDidMount() {
    http.get('/animals')
      .then(res => {
        this.setState({
           animals: res.data
        });
      });
  }

  removeAnimal(id) {
    model.removeById(id, 'animals').then(() => {
      this.componentDidMount();
    });
  }

  render() {
    const animals = this.state.animals.map((animal) =>
      <tr>
        <td>{animal.id}</td>
        <td>{animal.name}</td>
        <td>{animal.species}</td>
        <td>{animal.breed}</td>
        <td>
          <Link to={'/admin/animais/'+animal.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
          <button onClick={this.removeAnimal.bind(this, animal.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Animais</h1> 
        <Link to="/admin/animais/novo" className="btn btn-save btn-new">Cadastrar novo</Link>
        <table className="content-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Especie</th>
                    <th>Raça</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
              {animals}
            </tbody>
        </table>
      </div>
    );
  }
}

export default Animals;

