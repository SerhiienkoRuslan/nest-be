import API from '../api';
import { getCookie } from 'cookies-next';

export const updateUserData = async (userData, id) => {
  try {
    const token = getCookie('token');
    const response = await API.put(`/user/${id}/`, userData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.user;
  } catch (error) {
    throw new Error(`Failed to update user data: ${error.message}`);
  }
};
