'use client';
import { MuiOtpInput } from '@/components/MuiOtpInput/MuiOtpInput';
import { Box, Button, FormHelperText, Typography } from '@mui/material';
import { useState } from 'react';

const ConfirmationForm = () => {
  const [value, setValue] = useState<string>('');
  const [formErrors, setFormErrors] = useState<string | null>(null);

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  const onSubmit = () => {};

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Confirm Registration
      </Typography>
      <MuiOtpInput
        length={6}
        autoFocus
        gap={2}
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
          disabled={value.length !== 6}
          disableElevation
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          color="secondary"
        >
          Confirm
        </Button>
      </Box>
    </>
  );
};

export default ConfirmationForm;
