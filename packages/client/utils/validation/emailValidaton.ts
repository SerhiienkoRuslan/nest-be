import * as Yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const emailValidation = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Must be a valid email')
    .email('Must be a valid email')
    .max(100)
    .required('Email is required'),
});
