import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';
import moment from 'moment';

class EditAnimal extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
			id: null,
			animalId: null,
			serviceId: null,
			time: null,
			date: null,
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
      
    http.get('/schedules/'+this.props.match.params.id)
      .then(res => {
        this.setState(res.data);
      });
  }

  handleInputChange(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;
		let timeInput = document.getElementsByName("time")[0];

		timeInput.setCustomValidity("");

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		let timeInput = document.getElementsByName("time")[0];
		let dateInput = document.getElementsByName("date")[0];
		let dateMoment = moment(this.state.date, 'YYYY-MM-DD');
		let timeMoment = moment(this.state.time, 'HH:mm');

		if (!dateMoment.isSameOrAfter(Date.now())) {
			dateInput.setCustomValidity("Data inválida.");
		}

		let data = {
			id: this.state.id,
			animalId: parseInt(this.state.animalId),
			serviceId: parseInt(this.state.serviceId),
			time: this.state.time,
			date: this.state.date
		}
		http.put('/schedules/'+this.state.id, data)
			.then(res => {
        this.props.history.push('/cliente/agendamentos');
				this.componentDidMount();
			}).catch(error => {
				timeInput.setCustomValidity("Horário já reservado ou fora do horário comercial.");
			})
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
				<h1>Agendamentos</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="animalId">Animal</label>
						<select name="animalId" value={this.state.animalId} required onChange={this.handleInputChange}>
							<option value="">Selecione um animal</option>
							{animals}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="serviceId">Serviço</label>
						<select name="serviceId" value={this.state.serviceId} required onChange={this.handleInputChange}>
							<option value="">Selecione um serviço</option>
							{services}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="time">Horário</label>
						<input type="time" name="time" value={this.state.time} required onChange={this.handleInputChange} />
					</div>
					<div className="form-group">
						<label htmlFor="date">Data</label>
						<input type="date" name="date" value={this.state.date} required onChange={this.handleInputChange} />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-save">Salvar</button>
            <Link to="/cliente/agendamentos" className="btn btn-cancel">Cancelar</Link>
          </div>
				</form>
			</div>
    );
  }
}

export default EditAnimal;

