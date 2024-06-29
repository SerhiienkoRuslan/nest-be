import * as Yup from 'yup';

export const createPostValidation = Yup.object().shape({
  title: Yup.string().min(2, 'Title has min 2 characters').required('Title is required'),
  content: Yup.string().required('Content is required'),
});
