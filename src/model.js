import http from './http';

const model = {
  getById: (id, resource) => {
    // return collection.map((item) => {
    //   if(item.id == id) {
    //     return item;
    //   }
    // })[0];
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
  }
}

export default model;