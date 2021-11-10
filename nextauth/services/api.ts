import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { setCookie, parseCookies } from 'nookies';

type Request = {
  onSuccess: () => void
  onFailure: (error: AxiosError) => void
};

let cookies = parseCookies();
let isRefreshing = false;
let failedRequestQueue: Request[] = [];

const api = axios.create({
  baseURL: 'http://localhost:3333',
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers['Authorization'] = `Bearer ${cookies['nextauth.token']}`;
  return config;
})

api.interceptors.response.use((response: AxiosResponse) => response, (error: AxiosError) => {
  if (error.response?.status === 401) {
    if (error.response.data?.code == 'token.expired') {
      cookies = parseCookies();

      const { 'nextauth.refreshToken': refreshToken } = cookies;
      const originalConfig = error.config;

      if (!isRefreshing) {
        isRefreshing = true;

        api.post('/refresh', {
          refreshToken,
        }).then(response => {
          const { token } = response.data;

          setCookie(undefined, 'nextauth.token', token, {
            maxAge: 60 + 60 * 24 * 30, // 30 days
            path: '/'
          });

          setCookie(undefined, 'nextauth.refreshToken', response.data.refreshToken, {
            maxAge: 60 + 60 * 24 * 30, // 30 days
            path: '/'
          });

          failedRequestQueue.forEach(request => request.onSuccess());
          failedRequestQueue = [];
        }).catch(err => {
          failedRequestQueue.forEach(request => request.onFailure(err));
          failedRequestQueue = [];
        })
          .finally(() => {
            isRefreshing = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          onSuccess: () => {
            resolve(api(originalConfig));
          },
          onFailure: (error: AxiosError) => {
            reject(error);
          }
        });
      });
    } else {

    }
  }
});

export { api };