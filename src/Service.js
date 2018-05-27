import http from './http';

const Service = {
  getById: (id, resource) => {
    // return collection.map((item) => {
    //   if(item.id == id) {
    //     return item;
    //   }
    // })[0];
  },
  removeById: (id, resource) => {
    http.delete('/' + resource + '/' + id);
  }
}

export default Service;