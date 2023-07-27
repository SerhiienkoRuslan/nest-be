import API from '@/lib/api';
import { Register, ResponseRegister } from '@/lib/Auth/models';
import { getRegistrationErrorMessage } from '@/utils/getErrorMessage';

export const fetchRegister = async (option: Register): Promise<ResponseRegister> => {
  return API.post('/registration', option)
    .then((response) => {
      if (!response.data.success) {
        const errorMessage = getRegistrationErrorMessage(response.data.message);
        throw new Error(errorMessage);
      }
      return response?.data;
    })
    .catch((error) => {
      throw new Error(error?.message || error);
    });
};
