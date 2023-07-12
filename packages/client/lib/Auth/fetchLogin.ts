import { setCookie } from 'cookies-next';

import API from '../api';

import { Login, ResponseLogin } from './models';

export const fetchLogin = async (options: Login): Promise<ResponseLogin> => {
  return API.post<ResponseLogin>('/login', options)
    .then((response) => {
      setCookie('token', response?.data?.user?.token);
      return response?.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
