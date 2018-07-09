import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class ProductsEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      description: null
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    http.get('/products/'+this.props.match.params.id)
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
  
    http.put('/products/'+this.state.id, this.state)
      .then(res => {
        this.props.history.push('/admin/produtos');
      });
  }

  render () {
    return (
      <div>
				<h1>Cadastrar produto</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Nome</label>
						<input type="text" name="name" autoFocus value={this.state.name} onChange={this.handleInputChange} required />
					</div>
					<div className="form-group">
						<label htmlFor="description">Descrição</label>
						<textarea name="description" cols="30" rows="10" value={this.state.description} onChange={this.handleInputChange}></textarea>
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-save">Salvar</button>
						<Link to="/admin/produtos" className="btn btn-cancel">Cancelar</Link>
					</div>

				</form>
			</div>
    );
  }
}

export default ProductsEdit;

