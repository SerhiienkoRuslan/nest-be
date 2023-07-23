import {ResponseCurrent} from "@/lib/Auth/models";
import API from '../api';

export const fetchCurrent = async () => {
  return API.get<ResponseCurrent>("/me")
    .then((response) => {
      // setCookie('token', response?.data?.user?.token);
      return response?.data;
    })
    .catch((error) => {
      throw new Error(error);
    });
}