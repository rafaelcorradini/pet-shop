import axios from 'axios';
const jwt = localStorage.getItem('jwt');

axios.defaults.baseURL = 'http://localhost:3004/api';
axios.defaults.port = '3004';
if (jwt != undefined && jwt != null)
    axios.defaults.headers.common['authorization'] = 'Bearer '+jwt;

export default axios;