import API from '@/lib/api';
import { getLoginErrorMessage } from '@/utils/getErrorMessage';

export const resetPassword = async (
  email: string,
  newPassword: string,
  newPasswordToken: string,
  currentPassword: string,
) => {
  try {
    const response = await API.post('/reset-password', {
      email,
      newPassword,
      newPasswordToken,
      currentPassword,
    });

    return response.data;
  } catch (error) {
    const errorMessage = getLoginErrorMessage(error?.response?.data?.message);
    throw new Error(errorMessage);
  }
};
