import * as Yup from 'yup';

export const profileSettingsValidation = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username must be between 3 and 20 characters')
    .max(20, 'Username must be between 3 and 20 characters')
    .required('Username cannot be empty'),
});