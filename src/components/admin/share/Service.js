const Service = {
  getById: (id, collection) => {
    return collection.map((item) => {
      if(item.id == id) {
        return item;
      }
    })[0];
  }
}

export default Service;