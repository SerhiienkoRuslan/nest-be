import API from '@/lib/api';
import { CreatePostResponseAPI, PostBody } from '@/types/api/posts';
import { getCreatePostErrorMessage } from '@/utils/getErrorMessage';

export const createPost = async (option: PostBody): Promise<CreatePostResponseAPI> => {
  return API.post('/post', option)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      const errorMessage = getCreatePostErrorMessage(error?.response?.data?.message);
      throw new Error(errorMessage);
    });
};
