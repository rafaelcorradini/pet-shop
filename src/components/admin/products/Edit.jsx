import React from 'react';
import axios from 'axios';
import Service from './../share/Service';
import API from './../../../api-config';
import { Link } from 'react-router-dom';

class ProductsEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    axios.get(API+'/products/'+this.props.params.id)
      .then(res => {
        this.setState({
          product: res.data
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

  render () {
    return (
      <div>
				<h1>Cadastrar produto</h1>
				<form action="">
					<p>
						<label htmlFor="name">Nome</label>
						<input type="text" autoFocus name="name" value={this.state.product.name} onChange={this.handleInputChange} required />
					</p>
					<p>
						<label htmlFor="category">Categoria</label>
						<select name="category">
							<option value="">Categoria 1</option>
							<option value="">Categoria 2</option>
						</select>
					</p>
					<p>
						<label htmlFor="description" value={this.state.product.description} onChange={this.handleInputChange}>Descrição</label>
						<textarea name="description" cols="30" rows="10"></textarea>
					</p>
					<p>
						<button type="submit" className="btn btn-save">Salvar</button>
						<button type="submit" className="btn btn-cancel">Cancelar</button>


					</p>

				</form>
			</div>
    );
  }
}

export default ProductsEdit;

