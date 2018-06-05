import React from 'react';
import http from './../../../http';
import model from './../../../model';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			orders: [],
			products: []
		};

		this.handleInputChange = this.handleInputChange.bind(this);
	}

	componentDidMount() {
		
		http.get('/products')
			.then(res => {
				this.setState({
					products: res.data
				});

				http.get('/orders?clientId=' + JSON.parse(localStorage.getItem('jwt')).id + '&finalized=true&_sort=date&_order=desc')
					.then(res => {
						this.setState({
							orders: res.data
						});
					});
			});
	}

	removeOrder(id) {
		model.removeById(id, 'orders').then(() => {
			this.componentDidMount();
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

	render() {
		let orders;
		if (this.state.orders.length > 0) {
			orders = this.state.orders.map((order) =>
				<tr>
				
					<td>{moment(moment.utc(Date.parse(order.date))).format('DD/MM/YYYY')}</td>
					<td>
						
						<Link to={ "/cliente/pedidos/"+order.id} className="btn-actions btn-edit"><i class="fas fa-info"></i></Link>
						<button onClick={this.removeOrder.bind(this, order.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
					</td>
				</tr>
			);
		} else {
			orders = <tr><td>Nenhum pedido realizado.</td></tr>;
		}
			

		return (
			<div>
				<h1>Pedidos</h1>
				<Link to="/cliente/pedidos/novo" className="btn btn-save btn-new">Cadastrar novo</Link>
				<table className="content-table">
					<thead>
						<tr>
							<th>Data</th>
							<th>Açoes</th>
						</tr>
					</thead>
					<tbody>
						{orders}
					</tbody>
				</table>
			</div>


		);
	}
}

export default Index;

