import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? '/api' : 'http://localhost:8888/.netlify/functions/server',
});

export default api;
