'use client';

import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Box, Button, TextField, Typography } from '@mui/material';

import { forgotPassword } from '@/lib/Auth/forgotPassword';
import { emailValidation } from '@/utils/validation/emailValidaton';

const ForgotPasswordPage: FC = () => {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailValidation,

    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        await forgotPassword(values.email);
        sessionStorage.setItem('email', values.email);
        router.push('/auth/forgot-password/confirmation-password');
        resetForm();
      } catch (error) {
        setErrors({ email: error.message });
      }
    },
  });

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '50vw', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="h5" gutterBottom>
          Enter Email Address
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            margin="normal"
          />

          <Link href="/auth/login" passHref>
            <Typography variant="body2" style={{ marginTop: '1rem', display: 'block' }}>
              Back to sign in
            </Typography>
          </Link>

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
        </form>
      </Box>
    </Box>
  );
};

export default ForgotPasswordPage;
