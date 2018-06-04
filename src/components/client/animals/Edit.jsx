import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class EditAnimal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      species: null,
      breed: null,
      age: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    http.get('/animals/'+this.props.match.params.id)
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

    let data = {};
    Object.assign(data, this.state);
    delete data.categories;
  
    http.put('/animals/'+data.id, data)
      .then(res => {
        this.props.history.push('/admin/animais');
      });
  }

  render () {
    return (
      <div>
				<h1>Editar Animal</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nome</label>
            <input type="text" autoFocus name="name" value={this.state.name} onChange={this.handleInputChange} required />
          </div>
           <div className="form-group">
            <label htmlFor="species">Espécie</label>
            <input type="text" name="species" value={this.state.species} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="breed">Raça</label>
            <input type="text" name="breed"  value={this.state.breed} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="age">Idade</label>
            <input type="number" name="age"  value={this.state.age} onChange={this.handleInputChange} required />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-save">Salvar</button>
            <Link to="/admin/animais" className="btn btn-cancel">Cancelar</Link>
          </div>
				</form>
			</div>
    );
  }
}

export default EditAnimal;

