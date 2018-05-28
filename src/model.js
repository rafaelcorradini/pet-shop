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

    console.log(admin);
    if (admin == null || admin == undefined || admin.username == null || admin.password == null)
      return false

    return http.get('/admins?username='+ admin.username +'&?password='+ admin.password)
      .then(res => {
        if (res.data.length > 0)
          return true
        return false  
      });
  },
  removeById: (id, resource) => {
    http.delete('/' + resource + '/' + id);
  }
}

export default model;