import React from 'react';
import model from './../../../model';
import http from './../../../http';
import { Link } from 'react-router-dom';

class Schedules extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      schedules: []
    };
  }

  componentDidMount() {
    http.get('/schedules')
      .then(res => {
        this.setState({
           schedules: res.data
        });
      });
  }

  removeSchedule(id) {
    model.removeById(id, 'schedules').then(() => {
      this.componentDidMount();
    });
  }

  render() {
    const schedules = this.state.schedule.map((schedule) =>
      <tr>
        <td>{schedule.service}</td>
        <td>{schedule.name}</td>
        <td>{schedule.day}</td>
        <td>{schedule.time}</td>
        <td>
          <Link to={'/client/schedules/'+schedule.id} className="btn-actions btn-edit" title="editar"><i className="fas fa-edit"></i></Link>
          <button onClick={this.removeSchedule.bind(this, schedule.id)} className="btn-actions btn-remove" title="excluir"><i className="fas fa-trash-alt"></i></button>
        </td>
      </tr>
    );
    return (
      <div>
        <h1>Agendamentos</h1> 
        <Link to="/client/schedules/novo" className="btn btn-save btn-new">Cadastrar novo</Link>
        <table className="content-table">
            <thead>
                <tr>
                    <th>Serviço</th>
                    <th>Nome do Animal</th>
                    <th>Dia</th>
                    <th>Hora</th>
                    <th>Açoes</th>
                </tr>
            </thead>
            <tbody>
              {schedules}
            </tbody>
        </table>
      </div>
    );
  }
}

export default Schedules;

