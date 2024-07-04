import * as Yup from 'yup';

export const passwordValidation = Yup.object().shape({
  currentPassword: Yup.string()
    .required('Current password is required'),
  newPassword: Yup.string()
    .notOneOf([Yup.ref('currentPassword')], 'New password must be different from current password')
    .min(6, 'New password must be at least 6 characters long')
    .required('New password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Passwords must match')
    .required('Confirm password is required'),
});
