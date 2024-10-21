'use client';

import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';

import { Box, Button, Typography } from '@mui/material';

import { MuiOtpInput } from '@/components/MuiOtpInput/MuiOtpInput';

const ConfirmationPasswordPage: FC = () => {
  const router = useRouter();
  const [token, setToken] = useState<string>('');

  const handleChange = (value: string) => {
    setToken(value);
  };

  const onSubmit = () => {
    sessionStorage.setItem('emailtoken', token);
    router.push('/auth/forgot-password/reset');
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ width: '50vw', textAlign: 'center' }}>
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
          value={token}
          onChange={handleChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '&.Mui-focused fieldset': {
                borderColor: 'secondary.main',
              },
            },
          }}
        />

        <Box sx={{ mt: 2 }}>
          <Button
            disabled={token.length !== 7}
            disableElevation
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="secondary"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ConfirmationPasswordPage;
