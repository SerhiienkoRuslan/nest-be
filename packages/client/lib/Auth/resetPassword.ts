import API from '@/lib/api';
import { getLoginErrorMessage } from '@/utils/getErrorMessage';

export const resetPassword = async (
  email: string,
  currentPassword: string,
  newPassword: string,
  newPasswordToken: string,
) => {
  try {
    const response = await API.post(`/reset-password/`, {
      email,
      currentPassword,
      newPassword,
      newPasswordToken,
    });

    return response.data;
  } catch (error) {
    const errorMessage = getLoginErrorMessage(error?.response?.data?.message);
    throw new Error(errorMessage);
  }
};
