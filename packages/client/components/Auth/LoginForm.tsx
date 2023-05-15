'use client';
import { FC, useState } from 'react';
import { Formik } from 'formik';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { loginValidation } from '@/utils/validation';

const initialValues = {
  email: '',
  password: '',
  submit: null,
};

const LoginForm: FC = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setRememberMe] = useState(true);

  const handleClickRememberMe = (event) => setRememberMe(event.target.checked);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (
    values,
    { setErrors, setStatus, setSubmitting },
  ) => {
    try {
      setStatus({ success: true });
      setSubmitting(false);
    } catch (err) {
      setStatus({ success: false });
      setErrors({ submit: err.message });
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginValidation}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {/* Email */}
          <FormControl
            fullWidth
            error={Boolean(touched.email && errors.email)}
            // @ts-ignore
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-email-login">
              Email Address / Username
            </InputLabel>

            <OutlinedInput
              id="outlined-adornment-email-login"
              type="email"
              value={values.email}
              name="email"
              onBlur={handleBlur}
              onChange={handleChange}
              label="Email Address / Username"
              inputProps={{}}
            />

            {touched.email && errors.email && (
              // @ts-ignore
              <FormHelperText error>{errors.email}</FormHelperText>
            )}
          </FormControl>

          {/* Password */}
          <FormControl
            fullWidth
            error={Boolean(touched.password && errors.password)}
            // @ts-ignore
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-password-login">
              Password
            </InputLabel>

            <OutlinedInput
              id="outlined-adornment-password-login"
              type={showPassword ? 'text' : 'password'}
              value={values.password}
              name="password"
              onBlur={handleBlur}
              onChange={handleChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                    size="large"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
              inputProps={{}}
            />

            {touched.password && errors.password && (
              // @ts-ignore
              <FormHelperText error>{errors.password}</FormHelperText>
            )}
          </FormControl>

          {/* Forgot Password */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            spacing={1}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={isRememberMe}
                  onChange={handleClickRememberMe}
                  name="isRememberMe"
                  color="primary"
                />
              }
              label="Remember me"
            />

            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Forgot Password?
            </Typography>
          </Stack>

          {/* Submit button */}
          {errors.submit && (
            <Box sx={{ mt: 3 }}>
              {/* @ts-ignore */}
              <FormHelperText error>{errors.submit}</FormHelperText>
            </Box>
          )}

          <Box sx={{ mt: 2 }}>
            <Button
              disableElevation
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="secondary"
            >
              Sign in
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
