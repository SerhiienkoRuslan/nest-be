'use client';

import { Formik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FC, useContext, useState } from 'react';
import { useMutation } from 'react-query';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
import { useTheme } from '@mui/material/styles';

import { RequestLoading } from '@/components/Loading';
import { AuthContext } from '@/context/AuthContext';
import { fetchLogin } from '@/lib/Auth/fetchLogin';
import { loginValidation } from '@/utils/validation/auth';

const initialValues = {
  email: '',
  password: '',
  submit: null,
};

const LoginForm: FC = () => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isRememberMe, setRememberMe] = useState(true);
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const { logIn } = useContext(AuthContext);
  const router = useRouter();

  const handleClickRememberMe = (event) => setRememberMe(event.target.checked);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    mutate: signInUser,
    isLoading,
    isError: isErrorLogin,
    data: loginData,
    isSuccess: isSuccessLogin,
  } = useMutation(
    ({ email, password }: { email: string; password: string }) =>
      fetchLogin({
        email,
        password,
      }),
    {
      onSuccess: ({ user }) => {
        router.push('/dashboard');
        logIn(user);
      },
      onError: (error: string) => {
        setFormErrors(error.toString());
      },
    },
  );

  const onSubmitLogin = async (data) => {
    setFormErrors(null);
    signInUser(data);
  };

  return (
    <>
      {isLoading && <RequestLoading />}

      <Formik
        initialValues={initialValues}
        validationSchema={loginValidation}
        onSubmit={onSubmitLogin}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* Email */}
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              // @ts-ignore
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-login">Email Address</InputLabel>

              <OutlinedInput
                id="outlined-adornment-email-login"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                label="Email Address"
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
              <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>

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
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
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

              <Link href="/auth/forgot-password">
                <Typography
                  variant="subtitle1"
                  color="secondary"
                  sx={{ textDecoration: 'none', cursor: 'pointer' }}
                >
                  Forgot Password?
                </Typography>
              </Link>
            </Stack>

            {/* Submit button */}
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                {/* @ts-ignore */}
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            {/* { Submit error} */}
            {formErrors && (
              <Box>
                <FormHelperText error>{formErrors}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                disabled={isLoading || isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                {isLoading ? 'Loading...' : 'Sign in'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default LoginForm;
