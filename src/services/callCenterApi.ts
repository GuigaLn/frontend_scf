import axios from 'axios';

/*
* SERVIDOR COM A API DO WHATS
*/

const api = axios.create({
  baseURL: 'http://localhost:3332',
});

export default api;