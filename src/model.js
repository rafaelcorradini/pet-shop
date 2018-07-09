import http from './http';
import moment from 'moment';

const model = {
  getById: (id, collection) => {
    return collection.filter(item => item.id === id)[0];
  },
  auth: async (type) => {
    let test = false;
    await http.get('/users/me')
      .then(res => {
        if (res.status == 200 && res.data.role == type)
          test = true;
      }, err => {
        test = false;
      });
    return test;
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