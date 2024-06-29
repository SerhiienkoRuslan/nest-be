import API from '../api';

import { LoginBody, LoginResponseAPI } from '@/types/api/auth';
import { getLoginErrorMessage } from '@/utils/getErrorMessage';

export const fetchLogin = async (options: LoginBody): Promise<LoginResponseAPI> => {
  return API.post<LoginResponseAPI>('/login', options)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      const errorMessage = getLoginErrorMessage(error?.response?.data?.message);
      throw new Error(errorMessage);
    });
};
