import API from '../api';

import { CurrentUserResponseAPI } from '@/types/api/auth';

export const fetchCurrent = async () => {
  return API.get<CurrentUserResponseAPI>('/me')
    .then((response) => {
      // setCookie('token', response?.data?.user?.token);
      return response?.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
};
