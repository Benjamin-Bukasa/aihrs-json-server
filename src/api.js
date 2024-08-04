import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // cela redirigera vers json-server via le proxy configuré dans Netlify
});

export default api;
