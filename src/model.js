import http from './http';
import moment from 'moment';

const model = {
  getById: (id, collection) => {
    return collection.filter(item => item.id === id)[0];
  },
  auth: (type) => {
    let user = JSON.parse(localStorage.getItem('jwt'));

    if (user == null || user == undefined || user.email == null || user.password == null || user.type != type)
      return false;

    if (user.type = 'client') {
      return  http
              .get('/clients?email='+ user.email)
              .then(res => {
                if (res.data.length > 0)
                  if (res.data[0].password == user.password)
                    return true;
                return false;
              });
    } else {
      return  http
              .get('/admins?email='+ user.email)
              .then(res => {
                if (res.data.length > 0)
                  if (res.data[0].password == user.password)
                    return true;
                return false;
              });
    }
    
  },
  removeById: (id, resource) => {
    return http.delete('/' + resource + '/' + id);
  },
  showDuration: (time, duration) => {
    let total = moment(time, "HH:mm").add(parseInt(duration.split(':')[0]), 'hours').format('HH:mm');
    total = moment(total, "HH:mm").add(parseInt(duration.split(':')[1]), 'minutes').format('HH:mm');
    return total

  }
}

export default model;