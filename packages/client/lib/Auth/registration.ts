import API from '@/lib/api';
import { RegistrationBody, RegistrationResponseAPI } from '@/types/api/auth';
import { getRegistrationErrorMessage } from '@/utils/getErrorMessage';

export const registration = async (option: RegistrationBody): Promise<RegistrationResponseAPI> => {
  return API.post('/registration', option)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      const errorMessage = getRegistrationErrorMessage(error?.response?.data?.message);
      throw new Error(errorMessage);
    });
};
