import http from './http';
import moment from 'moment';

const model = {
  getById: (id, collection) => {
    return collection.filter(item => item.id === id)[0];
  },
  auth: () => {
    let admin = JSON.parse(localStorage.getItem('jwt'));

    if (admin == null || admin == undefined || admin.email == null || admin.password == null)
      return false;

    return http.get('/admins?email='+ admin.email)
      .then(res => {
        if (res.data.length > 0)
          if (res.data[0].password == admin.password)
            return true;
        return false;
      });
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