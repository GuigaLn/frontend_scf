import axios from 'axios';
import { END_POINT } from './utils';

const api = axios.create({
 baseURL: 'http://192.168.10.10:3333',
 //baseURL: END_POINT,
});

export default api;