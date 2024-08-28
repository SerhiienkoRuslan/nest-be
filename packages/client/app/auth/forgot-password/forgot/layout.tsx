'use client';

import { Form, FormikProvider, useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { FormikTextField } from '@/components/FormikComponents/FormikTextField';
import { forgotPassword } from '@/lib/Auth/forgotPassword';
import { emailValidation } from '@/utils/validation/emailValidaton';

const ForgotPasswordLayout: FC = () => {
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
        router.push('/auth/forgot-password/confirmation');
        resetForm();
      } catch (error) {
        setErrors({ email: error.message });
      }
    },
  });

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ width: '50vw', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Forgot Password
        </Typography>
        <Typography variant="h5" gutterBottom>
          Enter Email Address
        </Typography>

        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <FormikTextField fullWidth name="email" label="Email" margin="normal" />

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
                {formik.isSubmitting ? 'Loading...' : 'Submit'}
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

export default ForgotPasswordLayout;
