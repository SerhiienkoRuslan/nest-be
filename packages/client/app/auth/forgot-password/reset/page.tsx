'use client';

import { Form, FormikProvider, useFormik } from 'formik';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import { FormikTextField } from '@/components/FormikComponents/FormikTextField';
import { resetPassword } from '@/lib/Auth/resetPassword';
import { resetPasswordValidation } from '@/utils/validation/resetPasswordValidation';

const ResetPasswordPage: FC = () => {
  const [storedEmail, setStoredEmail] = useState<string>('');
  const [storedToken, setStoredToken] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const theme: Theme = useTheme();

  useEffect(() => {
    const email = sessionStorage.getItem('email') || '';
    const token = sessionStorage.getItem('emailtoken') || '';

    setStoredEmail(email);
    setStoredToken(token);
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

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              icon={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowPassword}
                  size="small"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
            />
            <Typography variant="h5">Confim Password</Typography>
            <FormikTextField
              fullWidth
              name="confirmPassword"
              label="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              margin="normal"
              icon={
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShowConfirmPassword}
                  size="small"
                >
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              }
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
                {formik.isSubmitting ? 'Loading...' : 'Submit'}
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
                <Link href="/auth/login" passHref>
                  <Typography variant="body2" style={{ marginTop: '1rem', display: 'block' }}>
                    Back to sign in
                  </Typography>
                </Link>
              </Box>
            )}
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

export default ResetPasswordPage;
