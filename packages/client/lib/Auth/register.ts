import API from '@/lib/api';
import { Register, ResponseRegister } from '@/lib/Auth/models';
import { getRegistrationErrorMessage } from '@/utils/getErrorMessage';

export const register = async (option: Register): Promise<ResponseRegister> => {
  return API.post('/registration', option)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      const errorMessage = getRegistrationErrorMessage(error?.response?.data?.message);
      throw new Error(errorMessage);
    });
};
