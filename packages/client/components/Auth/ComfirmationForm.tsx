'use client';
import Loader from '@/app/loading';
import { MuiOtpInput } from '@/components/MuiOtpInput/MuiOtpInput';
import { confirmEmail } from '@/lib/Auth/confirmEmail';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useMutation } from 'react-query';

const ConfirmationForm = () => {
  const [value, setValue] = useState<string>('');
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const {
    mutate: confirmUser,
    isLoading,
    isError: isErrorLogin,
    data: loginData,
    isSuccess: isSuccessLogin,
  } = useMutation((str: string) => confirmEmail(str), {
    onSuccess: (data) => {
      setFormErrors(null);
      router.push('/auth/login');
    },
    onError: (error: Error) => {
      setFormErrors(error.toString());
    },
  });

  const onSubmit = () => {
    confirmUser(value);
  };

  return (
    <>
      {isLoading && <Loader />}

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

      {/*{ Submit error}*/}
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
    </>
  );
};

export default ConfirmationForm;
