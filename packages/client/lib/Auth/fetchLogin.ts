import API from '../api';

import { Login, ResponseLogin } from './models';

export const fetchLogin = async (options: Login): Promise<ResponseLogin> => {
  return API.post<ResponseLogin>('/login', options)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
