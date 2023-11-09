import axios from 'axios';
import {BASE_URL} from '../config';

const ApiManager = axios.create({
  baseURL: 'http://localhost:8080/api',
  responseType: 'json',
  withCredentials: true,
});

export default ApiManager;
