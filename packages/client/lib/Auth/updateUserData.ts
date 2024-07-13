import API from '../api';

import { User } from '@/types/api/user';

export const updateUserData = async (id: number, userData: Partial<User>) => {
  try {
    const response = await API.put(`/user/${id}/`, userData);

    return response.data.user;
  } catch (error) {
    throw new Error(`Failed to update user data: ${error.message}`);
  }
};
