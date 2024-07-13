import { Form, FormikProvider, useFormik } from 'formik';
import { ChangeEvent, FC, useContext, useState } from 'react';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, CircularProgress, Grid, IconButton, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import { FormicTextField } from '@/components/FormikComponents/FormikTextField';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import { AuthContext } from '@/context/AuthContext';
import API from '@/lib/api';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';
import { passwordValidation } from '@/utils/validation/passwordValidation';

const ProfileChangePassword: FC = () => {
  const { user } = useContext(AuthContext);

  const theme: Theme = useTheme();
  const email = user?.email;

  const [message, setMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [level, setLevel] = useState({
    label: '',
    color: '',
  });

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    validationSchema: passwordValidation,

    onSubmit: async (values, { resetForm }) => {
      setMessage('');

      try {
        const response = await API.post('/reset-password', {
          email,
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        });

        if (response.data.success) {
          setMessage('Password successfully changed');
          resetForm();
        } else {
          setMessage('An error occurred while changing the password');
        }
      } catch (error) {
        setMessage(
          error.response?.data?.message || 'An error occurred while changing the password',
        );
      }
    },
  });

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
    const strength = strengthIndicator(event.target.value);
    setPasswordStrength(strength);
    setLevel(strengthColor(passwordStrength));
  };

  return (
    <Grid
      container
      sx={{
        mt: 5,
        ml: 4,
      }}
    >
      <Grid item xs={5}>
        <FormikProvider value={formik}>
          <Form onSubmit={formik.handleSubmit}>
            <Typography variant="h4" component="h1" gutterBottom={true}>
              Change Password
            </Typography>

            <FormicTextField
              fullWidth
              label="CurrentPassword"
              autoComplete="off"
              name="currentPassword"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              color="secondary"
            />

            <FormicTextField
              fullWidth
              label="NewPassword"
              name="newPassword"
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              color="secondary"
              onChange={handleNewPasswordChange}
            />

            {formik.values.newPassword.length > 0 && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" style={{ color: level.color }}>
                  {level.label}
                </Typography>
                <Box
                  style={{ backgroundColor: level.color }}
                  sx={{ width: 85, height: 8, borderRadius: '7px', ml: 1 }}
                />
              </Box>
            )}

            <FormicTextField
              fullWidth
              label="Confirm New Password"
              name="confirmPassword"
              autoComplete="off"
              type={showPassword ? 'text' : 'password'}
              margin="normal"
              color="secondary"
            />

            <Box
              sx={{
                justifyContent: 'space-between',
                display: 'flex',
                mt: '15px',
              }}
            >
              <SubmitButton disabled={formik.isSubmitting} type="submit">
                {formik.isSubmitting ? 'Submitting...' : 'Change Password'}
              </SubmitButton>

              <IconButton
                aria-label="toggle password visibility"
                onClick={handleShowPassword}
                edge="end"
                size="large"
              >
                {showPassword ? <VisibilityIcon /> : <VisibilityOff />}
              </IconButton>
            </Box>

            {formik.isSubmitting && (
              <Box
                sx={{
                  m: '20px 0 0 50px',
                }}
              >
                <CircularProgress
                  sx={{
                    color: theme.palette.secondary.main,
                  }}
                />
              </Box>
            )}
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
      </Grid>
    </Grid>
  );
};

export default ProfileChangePassword;
