'use client';

import { Form, FormikProvider, useFormik } from 'formik';
import { FC, useEffect, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import { FormikTextField } from '@/components/FormikComponents/FormikTextField';
import { resetPassword } from '@/lib/Auth/resetPassword';
import { resetPasswordValidation } from '@/utils/validation/resetPasswordValidation';

const ResetPasswordPage: FC = () => {
  const [storedEmail, setStoredEmail] = useState<string>('');
  const [storedToken, setStoredToken] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const theme: Theme = useTheme();

  // const storedEmail = useMemo(() => {
  //   return sessionStorage.getItem('email') || '';
  // }, []);

  // const storedToken = useMemo(() => {
  //   return sessionStorage.getItem('email-token') || '';
  // }, []);

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    const token = sessionStorage.getItem('emailtoken');
    if (email) {
      setStoredEmail(email);
    }
    if (token) {
      setStoredToken(token);
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
        await resetPassword(storedEmail, values.newPassword, storedToken, '');
        sessionStorage.removeItem('email');
        sessionStorage.removeItem('emailtoken');
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

        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormikTextField
              fullWidth
              name="newPassword"
              label="New Password"
              type="password"
              margin="normal"
            />
            <Typography variant="h5">Confim Password</Typography>
            <FormikTextField
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type="password"
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
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
