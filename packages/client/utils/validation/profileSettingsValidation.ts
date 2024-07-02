import * as Yup from 'yup';

export const profileSettingsValidation = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be between 3 and 30 characters')
    .max(30, 'Username must be between 3 and 30 characters')
    .required('Username cannot be empty'),
});