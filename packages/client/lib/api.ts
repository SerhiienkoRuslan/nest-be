import axios, { AxiosInstance } from 'axios';
import { getCookie } from 'cookies-next';

const processBuild =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : process.env.NEXT_DEV_API_URL;

const API: AxiosInstance = axios.create({
  baseURL: `${(processBuild || '').replace(/\/$/, '')}/api`,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  function (config) {
    const token = getCookie('token');

    if (!token) {
      return config;
    }

    config.headers = config.headers ?? {};

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },

  function (error) {
    return Promise.reject(error);
  },
);

// API.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     const originalRequest = error.config;
//
//     // If it's a request to refresh tokens, don't retry to avoid infinite loop
//     // if (originalRequest.url.includes('/refresh_token')) {
//     //   return Promise.reject(error);
//     // }
//
//     // If the error is not a 401 or the request has already been retried, reject
//     if (error.response.status !== 401 || originalRequest.retry) {
//       return Promise.reject(error);
//     }
//
//     try {
//       // const payload = {
//       //   access_token: getCookie('accessToken'),
//       //   refresh_token: getCookie('refreshToken'),
//       // };
//       //
//       // const { data } = await API.post(`/refresh_token`, payload);
//       //
//       // setCookie('refreshToken', data.id_token);
//       // setCookie('accessToken', data.access_token);
//       // localStorage.setItem('User', JSON.stringify(data));
//
//       // Update the original request with new access token
//       originalRequest.headers['Authorization'] = 'Bearer ' + data.access_token;
//       // originalRequest.retry = true;
//
//       return API(originalRequest);
//     } catch (err) {
//       // If refreshing tokens fails, reject the promise
//       return Promise.reject(err);
//     }
//   },
// );

export default API;
