import React from 'react';
import http from './../../../http';
import { Link } from 'react-router-dom';

class EditServices extends React.Component{
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
    http.get('/services/'+this.props.match.params.id)
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

    let data = {};
    Object.assign(data, this.state);
    delete data.categories;
  
    http.put('/services/'+data.id, data)
      .then(res => {
        this.props.history.push('/admin/servicos');
      });
  }

  render () {
    return (
      <div>
				<h1>Editar Serviço</h1>
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
						<label htmlFor="duration">Duração(Horas:minutos)</label>
						<input type="time" name="duration" value={this.state.duration} onChange={this.handleInputChange} required />
					</div>
					<div className="form-group">
						<button type="submit" className="btn btn-save">Salvar</button>
						<Link to="/admin/servicos" className="btn btn-cancel">Cancelar</Link>
					</div>

				</form>
			</div>
    );
  }
}

export default EditServices;

