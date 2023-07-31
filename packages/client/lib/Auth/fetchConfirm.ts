import API from '@/lib/api';
import { getLoginErrorMessage } from '@/utils/getErrorMessage';

export const fetchConfirm = (value: string) => {
  return API.get(`/verify/${value}`)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      const errorMessage = getLoginErrorMessage(error?.response?.data?.message);
      throw new Error(errorMessage);
    });
};
