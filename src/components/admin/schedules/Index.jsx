import React from 'react';
import http from './../../../http';
import model from './../../../model';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: null,
			name: null,
			animalId: null,
			serviceId: null,
			time: null,
			date: null,
			animals: [],
			services: [],
			schedules: []
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

		http.get('/schedules')
			.then(res => {
				this.setState({
					schedules: res.data
				});
			});

	}

	removeSchedule(id) {
    model.removeById(id, 'schedules').then(() => {
      this.componentDidMount();
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

		http.post('/schedules', this.state)
			.then(res => {
				this.props.history.push('/admin/agendamentos');
			});
	}

	render() {
		const animals = this.state.animals.map((animal) =>
			<option value={animal.id}>{animal.name}</option>
		);
		const services = this.state.services.map((service) =>
			<option value={service.id}>{service.name}</option>
		);
		const schedules = this.state.schedules.map((schedule) =>
			<tr>
				<td>{model.getById(schedule.serviceId, this.state.services).name}</td>
				<td>{model.getById(schedule.animalId, this.state.animals).name}</td>
				<td>{moment(moment.utc(Date.parse(schedule.date))).format('DD/MM/YYYY')}</td>
				<td>{schedule.time}</td>
				<td>
					<Link to={'/admin/agendamentos/' + schedule.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
					<button onClick={this.removeSchedule.bind(this, schedule.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
				</td>
			</tr>
		);

		return (
			<div>
				<h1>Agendamentos</h1>
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
						<label htmlFor="date">Data</label>
						<input type="date" name="date" value={this.state.date} required onChange={this.handleInputChange} />
					</div>
					<div className="form-group">
						<label htmlFor="time">Horário</label>
						<input type="time" name="time" value={this.state.time} required onChange={this.handleInputChange} />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-save">Adicionar</button>
					</div>

				</form>

				<div>
					<table className="content-table">
						<thead>
							<tr>
								<th>Serviço</th>
								<th>Nome do Animal</th>
								<th>Data</th>
								<th>Hora</th>
								<th>Açoes</th>
							</tr>
						</thead>
						<tbody>
							{schedules}
						</tbody>
					</table>
				</div>
			</div>


		);
	}
}

export default Index;

