import axios from 'axios';
import { END_POINT_CALL_CENTER } from './config';

/*
* SERVIDOR COM A API DO WHATS
*/

const api = axios.create({
  baseURL: END_POINT_CALL_CENTER,
});

export default api;