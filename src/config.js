const API_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions/json-server' 
  : 'http://localhost:5000';

export default API_URL;
