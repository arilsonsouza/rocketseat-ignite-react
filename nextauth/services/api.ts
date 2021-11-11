import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { setCookie, parseCookies } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

type Request = {
  onSuccess: (token: string) => void
  onFailure: (error: AxiosError) => void
};

let isRefreshing = false;
let failedRequestQueue: Request[] = [];

export function setupApiclient(ctx = undefined) {
  const api = axios.create({
    baseURL: 'http://localhost:3333',
  });

  let cookies = null;

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    cookies = parseCookies(ctx);
    config.headers['Authorization'] = `Bearer ${cookies['nextauth.token']}`;
    return config;
  })

  api.interceptors.response.use((response: AxiosResponse) => response, (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (error.response.data?.code == 'token.expired') {
        cookies = parseCookies(ctx);

        const { 'nextauth.refreshToken': refreshToken } = cookies;
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          api.post('/refresh', {
            refreshToken,
          }).then(response => {
            const { token } = response.data;

            setCookie(ctx, 'nextauth.token', token, {
              maxAge: 60 + 60 * 24 * 30, // 30 days
              path: '/'
            });

            setCookie(ctx, 'nextauth.refreshToken', response.data.refreshToken, {
              maxAge: 60 + 60 * 24 * 30, // 30 days
              path: '/'
            });

            failedRequestQueue.forEach(request => request.onSuccess(token));
            failedRequestQueue = [];
          }).catch(err => {
            failedRequestQueue.forEach(request => request.onFailure(err));
            failedRequestQueue = [];

            if (process.browser) {
              signOut();
            }
          })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token) => {
              resolve(api(originalConfig));
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            }
          });
        });
      } else {
        if (process.browser) {
          signOut();
        } else {
          return Promise.reject(new AuthTokenError());
        }
      }
    }
    return Promise.reject(error);
  });

  return api;
}