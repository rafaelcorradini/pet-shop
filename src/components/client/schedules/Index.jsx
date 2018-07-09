import React from 'react';
import http from './../../../http';
import model from './../../../model';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			animalId: '',
			serviceId: '',
			time: "08:00",
			date: moment(moment.utc(Date.now())).format('YYYY-MM-DD'),
			animals: [],
			services: [],
			schedules: []
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleInputChangeDate = this.handleInputChangeDate.bind(this);
	}

	componentWillMount() {
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

		http.get('/schedules?date=' + this.state.date)
			.then(res => {
				this.setState({
					schedules: res.data
				});
			});

	}

	handleInputChangeDate(event) {
		const target = event.target;

		this.setState({
			date: target.value
		});

		http.get('/schedules?date=' + target.value)
			.then(res => {
				this.setState({
					schedules: res.data
				});
			});
	}

	removeSchedule(id) {
		model.removeById(id, 'schedules').then(() => {
			this.componentWillMount();
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
		let dateMoment = moment(this.state.date, 'YYYY-MM-DD');
		let timeMoment = moment(this.state.time, 'HH:mm');

		let data = {
			animalId: this.state.animalId,
			serviceId: this.state.serviceId,
			time: this.state.time,
			date: this.state.date
		}
		http.post('/schedules', data)
			.then(res => {
				this.componentWillMount();
			}).catch(error => {
				timeInput.setCustomValidity("Horário já reservado ou fora do horário comercial.");
			})
	}

	render() {
		const animals = this.state.animals.map((animal) =>
			<option value={animal.id}>{animal.name}</option>
		);
		const services = this.state.services.map((service) =>
			<option value={service.id}>{service.name}</option>
		);
		let schedules;
		if (this.state.schedules.length > 0) {
			schedules = this.state.schedules.map((schedule) =>
				<tr>
					{model.getById(schedule.animalId, this.state.animals) == undefined
						? ''
						: <td>{model.getById(schedule.serviceId, this.state.services).name}</td>
					}
					
					{model.getById(schedule.animalId, this.state.animals) == undefined
						? <td colspan="2">Reservado</td>
						: <td>{model.getById(schedule.animalId, this.state.animals).name}</td>
					}
					<td>{moment(moment.utc(Date.parse(schedule.date))).format('DD/MM/YYYY')}</td>
					<td>{schedule.time} - {model.showDuration(schedule.time, model.getById(schedule.serviceId, this.state.services).duration)}</td>
					<td>
						{model.getById(schedule.animalId, this.state.animals) == undefined
							? ''
							:	<div>
									<Link to={'/cliente/agendamentos/' + schedule.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
									<button onClick={this.removeSchedule.bind(this, schedule.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
								</div>
						}
						
					</td>
				</tr>
			);
		} else {
			schedules = <tr><td>Nenhum agendamento cadastrado para esse dia.</td></tr>;
		}
			

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
						<input type="date" name="date" value={this.state.date} required onChange={this.handleInputChangeDate} />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-save">Adicionar</button>
					</div>

				</form>
				<br />
				<div>
					<h1>Agendamentos do dia {moment(moment.utc(Date.parse(this.state.date))).format('DD/MM/YYYY')}</h1>
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

