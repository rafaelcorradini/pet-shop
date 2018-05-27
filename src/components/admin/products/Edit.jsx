import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class ProductsEdit extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      name: null,
      categoryId: null,
      categories: []
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    http.get('/products/'+this.props.match.params.id)
      .then(res => {
        this.setState(res.data);
      });

    http.get('/categories')
      .then(res => {
        this.setState({
          categories: res.data
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
  
    http.put('/products/'+data.id, data)
      .then(res => {
        this.props.history.push('/admin/produtos');
      });
  }

  render () {
    const categories = this.state.categories.map((category) =>
      <option value={category.id}>{category.name}</option>
    );
    return (
      <div>
				<h1>Cadastrar produto</h1>
				<form onSubmit={this.handleSubmit}>
					<div className="form-group">
						<label htmlFor="name">Nome</label>
						<input type="text" name="name" autoFocus value={this.state.name} onChange={this.handleInputChange} required />
					</div>
					<div className="form-group">
						<label htmlFor="categoryId">Categoria</label>
						<select name="categoryId" value={this.state.categoryId} onChange={this.handleInputChange}>
							{categories}
						</select>
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

