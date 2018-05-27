import React from 'react';
import Service from './../../Service';
import http from './../../http';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    http.get('/products')
      .then(res => {
        this.setState({
          products: res.data
        });
      });
  }

  removeProduct(id) {
    Service.removeById(id, 'products');
    this.componentDidMount();
  }

  render() {
    const products = this.state.products.map((product) =>
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.categoryId}</td>
        <td>
          <Link to={'/admin/produtos/'+product.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
          <button onClick={this.removeProduct.bind(this, product.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Produtos</h1> 
        <Link to="/admin/produtos/novo" className="btn btn-save btn-new">Cadastrar novo</Link>
        <table className="content-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
              {products}
            </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;

