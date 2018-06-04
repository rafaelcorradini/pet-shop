import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class NewSchedule extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      animalId: null,
      serviceId: null,
      animals: [],
      services: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    http.get('/animals')
      .then(res => {
        this.setState({
          animals: res.data
        });
      });

    http.get('/services')
      .then(res => {
        this.setState({
          services: res.data
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

    let data = {};
    Object.assign(data, this.state);
    delete data.categories;
  
    http.post('/schedules', data)
      .then(res => {
        this.props.history.push('/admin/agendamentos');
      });
  }

  

  render () {
    const animals = this.state.animals.map((animal) =>
      <option value={animal.id}>{animal.name}</option>
    );
    const services = this.state.services.map((service) =>
      <option value={service.id}>{service.name}</option>
    );

    return (
      <div>
        <h1>Realizar Agendamento</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="animalID">Animal</label>
            <select name="animalID" value={this.state.animalId} required onChange={this.handleInputChange}>
              <option value="">Selecione um animal</option>
              {animals}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="serviceID">Serviço</label>
            <select name="serviceID" value={this.state.serviceId} required onChange={this.handleInputChange}>
              <option value="">Selecione um serviço</option>
              {services}
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-save">Salvar</button>
            <Link to="/admin/agendamentos" className="btn btn-cancel">Cancelar</Link>
          </div>

        </form>
      </div>
    );
  }
}

export default NewSchedule;

