import axios from 'axios';
import { END_POINT } from './config';

const api = axios.create({
 baseURL: END_POINT,
});

export default api;