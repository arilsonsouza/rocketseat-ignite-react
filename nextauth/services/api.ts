import axios, { AxiosRequestConfig } from 'axios';
import { parseCookies } from 'nookies';

const cookies = parseCookies();

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers['Authorization'] = `Bearer ${cookies['nextauth.token']}`;
  return config;
})

export { api };