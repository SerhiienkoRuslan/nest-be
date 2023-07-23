import * as Yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const loginValidation = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Must be a valid email')
    .email('Must be a valid email')
    .max(255)
    .required('Email is required'),
  password: Yup.string().min(6, 'Password has min 6 characters').required('Password is required'),
});

export const registrationValidation = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Must be a valid email')
    .email('Must be a valid email')
    .min(6, 'Password has min 6 characters')
    .required('Email is required'),
  password: Yup.string().min(6, 'Password has min 6 characters').required('Password is required'),
});
