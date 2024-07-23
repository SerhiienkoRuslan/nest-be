import API from '@/lib/api';
import { getLoginErrorMessage } from '@/utils/getErrorMessage';

export const forgotPassword = async (email: string) => {
  try {
    const response = await API.get(`/forgot-password/${email}`);

    return response.data;
  } catch (error) {
    const errorMessage = getLoginErrorMessage(error?.response?.data?.message);
    throw new Error(errorMessage);
  }
};
