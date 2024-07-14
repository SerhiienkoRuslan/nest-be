'use client';

import { useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import { resetPassword } from '@/lib/Auth/resetPassword';
import { resetPasswordValidation } from '@/utils/validation/resetPasswordValidation';

const ResetPasswordPage: FC = () => {
  const [storedEmail, setStoredEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const theme: Theme = useTheme();

  const currentPassword = '111222333';
  useEffect(() => {
    const email = sessionStorage.Item('email');
    if (email) {
      setStoredEmail(email);
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: resetPasswordValidation,

    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        await resetPassword(
          storedEmail,
          currentPassword,
          values.newPassword,
          values.confirmPassword,
        );
        localStorage.removeItem('email');
        resetForm();
        setMessage('Password successfully changed');
      } catch (error) {
        setErrors(error.message);
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '50vw', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          New Password
        </Typography>
        <Typography variant="h5">Enter New Password</Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
            helperText={formik.touched.newPassword && formik.errors.newPassword}
            margin="normal"
          />
          <Typography variant="h5">Confim Password</Typography>
          <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            margin="normal"
          />

          <Box sx={{ mt: 2 }}>
            <Button
              disableElevation
              disabled={formik.isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              {formik.isSubmitting ? 'Loading...' : 'Send'}
            </Button>
          </Box>
          {message && (
            <Box mt={2}>
              <Typography
                variant="body2"
                color={message.includes('successfully') ? theme.palette.success.dark : 'error'}
              >
                {message}
              </Typography>
            </Box>
          )}
        </form>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
