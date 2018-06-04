import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class NewAnimal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      species: null,
      breed: null,
      age: null,
      clientId: null,
      clients: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {

    http.get('/clients')
			.then(res => {
				this.setState({
					clients: res.data
				});
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

    let data = {
      id: this.state.id,
      name: this.state.name,
      species: this.state.species,
      breed: this.state.breed,
      age: parseInt(this.state.age),
      clientId: parseInt(this.state.clientId)
    };
  
    http.post('/animals', data)
      .then(res => {
        this.props.history.push('/admin/animais');
      });
  }

  

  render () {
    const clients = this.state.clients.map((client) =>
			<option value={client.id}>{client.name}</option>
    );
    return (
      <div>
				<h1>Criar Animal</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
						<label htmlFor="clientId">Cliente</label>
						<select name="clientId" value={this.state.clientId} required onChange={this.handleInputChange}>
							<option value="">Associe um cliente</option>
							{clients}
						</select>
					</div>
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

export default NewAnimal;

