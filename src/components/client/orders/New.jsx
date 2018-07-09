import React from 'react';
import http from './../../../http';
import model from './../../../model';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			productId: '',
			date: moment(moment.utc(Date.now())).format('YYYY-MM-DD'),
			quantity: 1,
			products: [],
			order: {}
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.submitOrder = this.submitOrder.bind(this);
	}

	componentWillMount() {
		http.get('/products')
			.then(res => {
				this.setState({
					products: res.data
				});
				http.get('/orders?finalized=false')
					.then(res => {
						if (res.data.length > 0) {
							this.setState({
								order: res.data[0]
							});
						} else {
							let data = {
								finalized: false,
								date: this.state.date,
								items: []
							}
							http.post('/orders', data).then(res => {
								this.setState({
									order: res.data
								});
							});
						}

					});
			});
	}

	removeItem(id) {
		let items = this.state.order.items.splice(id, 1);
		let order = this.state.order;
		order.items = items;
		http.put('/orders/' + this.state.order.id, order)
			.then(res => {
				this.setState({
					order: order
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

		let item = {
			productId: this.state.productId,
			quantity: parseInt(this.state.quantity)
		}
		let order = this.state.order;
		let flag = true;
		order.items.map((i) => {
			if (i.productId == item.productId) {
				i.quantity = i.quantity + item.quantity;
				flag = false;
			}
		});
		if (flag) {
			order.items.push(item);
		}
		http.put('/orders/' + order.id, order)
			.then(res => {
				this.setState(order);
			})
	}

	submitOrder() {
		let order = this.state.order;
		order.finalized = true;
		http.put('/orders/' + this.state.order.id, order)
			.then(res => {
				this.props.history.push('/cliente/pedidos');
			})
	}

	render() {
		let items;
		if (this.state.order.items != undefined) {
			items = this.state.order.items.map((item) =>
				<tr>
					<td>{model.getById(item.productId, this.state.products).name}</td>
					<td>{item.quantity}</td>
					<td>
						<button onClick={this.removeItem.bind(this, item.key)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>

					</td>
				</tr>

			);
		}
		const products = this.state.products.map((product) =>
			<option value={product.id}>{product.name}</option>
		);

		return (

			<div>
				<h1>Adicione produtos ao carrinho</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="productId">Produto</label>
						<select name="productId" value={this.state.productId} required onChange={this.handleInputChange}>
							<option value="">Selecione um produto</option>
							{products}
						</select>
					</div>
					<div className="form-group">
						<label htmlFor="quantity">Quantidade</label>
						<input type="number" name="quantity" value={this.state.quantity} onChange={this.handleInputChange} required />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-save">Adicionar</button>
					</div>

				</form>
				<br />
				<div>
					<h1>Pedidos</h1>
					<Link to="/cliente/pedidos" className="btn btn-cancel btn-new">Voltar</Link>
					<table className="content-table">
						<thead>
							<tr>
								<th>Produto</th>
								<th>Quantidade</th>
								<th>Açoes</th>
							</tr>
						</thead>
						<tbody>
							{items}
						</tbody>
					</table>
				</div>
				<br />
				<button onClick={this.submitOrder} className="btn btn-save" title="excluir">Finalizar</button>
			</div>

		);
	}
}

export default Index;

