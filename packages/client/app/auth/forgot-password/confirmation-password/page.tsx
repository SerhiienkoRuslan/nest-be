'use client';

import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { useMutation } from 'react-query';

import { Box, Button, FormHelperText, Grid, Typography } from '@mui/material';

import { RequestLoading } from '@/components/Loading';
import { MuiOtpInput } from '@/components/MuiOtpInput/MuiOtpInput';
import { resetPassword } from '@/lib/Auth/resetPassword';

interface ResetPasswordArgs {
  email: string;
  currentPassword: string;
  newPassword: string;
  newPasswordToken: string;
}

const ConfirmationPasswordPage: FC = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>('');
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [storedEmail, setStoredEmail] = useState<string>('');

  useEffect(() => {
    const email = sessionStorage.getItem('email');
    if (email) {
      setStoredEmail(email);
    }
  }, []);
  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const { mutate: confirmUser, isLoading } = useMutation(
    ({ email, currentPassword, newPassword, newPasswordToken }: ResetPasswordArgs) =>
      resetPassword(email, currentPassword, newPassword, newPasswordToken),
    {
      onSuccess: () => {
        setFormErrors(null);
        router.push('/auth/forgot-password/reset-password');
      },
      onError: (error: Error) => {
        setFormErrors(error.toString());
      },
    },
  );

  const onSubmit = () => {
    confirmUser({
      email: storedEmail,
      currentPassword: '',
      newPassword: '111222333',
      newPasswordToken: value,
    });
  };

  return (
    <Grid container spacing={2} textAlign="center" alignItems="center" justifyContent="center">
      <Grid item xs={12} md={12} lg={12}>
        {isLoading && <RequestLoading />}

        <Typography variant="h3" gutterBottom>
          Validation
        </Typography>

        <Typography variant="h4" gutterBottom>
          Enter 6 digits to confirm your email
        </Typography>

        <MuiOtpInput
          length={7}
          autoFocus
          gap={1}
          className="text-align: center"
          TextFieldsProps={{ type: 'text', size: 'medium', placeholder: '-' }}
          value={value}
          onChange={handleChange}
        />

        {formErrors && (
          <Box>
            <FormHelperText error>{formErrors}</FormHelperText>
          </Box>
        )}

        <Box sx={{ mt: 2 }}>
          <Button
            disabled={value.length !== 7 || isLoading}
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onSubmit}
          >
            {isLoading ? 'Loading...' : 'Confirm'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ConfirmationPasswordPage;
