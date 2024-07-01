import API from '../api';

export const updateUserData = async (userData: string, id: number) => {
  try {
    const response = await API.put(`/user/${id}/`, userData,);
    return response.data.user;
  } catch (error) {
    throw new Error(`Failed to update user data: ${error.message}`);
  }
};
