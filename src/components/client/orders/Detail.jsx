import React from 'react';
import http from './../../../http';
import model from './../../../model';
import { Link } from 'react-router-dom';
import moment from 'moment';

class Detail extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
            products: [],
            order: {}
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	componentWillMount() {
		http.get('/products')
			.then(res => {
				this.setState({
					products: res.data
                });
                http.get('/orders/' + this.props.match.params.id)
                    .then(res => {
                        this.setState({
                            order: res.data
                        });
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
			productId: parseInt(this.state.productId),
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
        if(flag) {
            order.items.push(item);
        }
		http.put('/orders/'+order.id, order)
			.then(res => {
				this.setState(order);
			})
	}

	render() {
        let items;
		if (this.state.order.items != undefined) {
            items = this.state.order.items.map((item) =>
                <tr>
                    <td>{model.getById(item.productId, this.state.products).name}</td>
                    <td>{item.quantity}</td>
                </tr>
              
            );
        }  
		const products = this.state.products.map((product) =>
            <option value={product.id}>{product.name}</option>
        );	

		return (
            
            <div>
                <h1>Pedidos</h1>
                <Link to="/cliente/pedidos" className="btn btn-cancel btn-new">Voltar</Link>
                <table className="content-table">
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Quantidade</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items}
                    </tbody>
                </table>
            </div>

		);
	}
}

export default Detail;

