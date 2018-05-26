import React from 'react';
import axios from 'axios';
import Service from './share/Service';
import API from './../../api-config';
import { Link } from 'react-router-dom';

class Dashboard extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    axios.get(API+'/products')
      .then(res => {
        this.setState({
          products: res.data
        });
      });
  }

  render () {
    const products = this.state.products.map((product) =>
      <tr>
        <td>{product.id}</td>
        <td>{product.name}</td>
        <td>{product.category.name}</td>
        <td>
          <Link to={'/admin/produtos/'+product.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
          <a href="#" className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></a>
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Produtos</h1> 
        <Link to="/admin/produtos" className="btn btn-save btn-new">Cadastrar novo</Link>
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

        <nav className="pagination">
            <ul>
                <li><a href="#"></a></li>
                <li><a href="#">1</a></li>
                <li><a href="#">2</a></li>
                <li><a href="#"></a></li>
            </ul>
        </nav>
      </div>
    );
  }
}

export default Dashboard;

