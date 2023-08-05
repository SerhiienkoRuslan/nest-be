'use client';

import { Formik } from 'formik';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { useMutation } from 'react-query';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { RequestLoading } from '@/components/Loading';
import { register } from '@/lib/Auth/register';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';
import { registrationValidation } from '@/utils/validation';

const initialValues = {
  fname: '',
  lname: '',
  email: '',
  password: '',
  submit: null,
};

const RegistrationForm: FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const [formErrors, setFormErrors] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState({
    label: '',
    color: '',
  });
  const router = useRouter();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const {
    mutate: registerUser,
    isLoading,
    isError: isErrorLogin,
    data: loginData,
    isSuccess: isSuccessLogin,
  } = useMutation(
    ({
      fname,
      lname,
      email,
      password,
    }: {
      lname: string;
      fname: string;
      email: string;
      password: string;
    }) =>
      register({
        username: `${fname} ${lname}`,
        email,
        password,
      }),
    {
      onSuccess: () => {
        router.push('/auth/confirmation');
      },
      onError: (error: string) => {
        setFormErrors(error.toString());
      },
    },
  );

  const handleSubmit = async (values) => {
    registerUser(values);
  };

  return (
    <>
      {isLoading && <RequestLoading />}

      <Formik
        initialValues={initialValues}
        validationSchema={registrationValidation}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            {/* First name & Last name */}
            <Grid container spacing={matchDownSM ? 0 : 2}>
              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.fname && errors.fname)}
                  // @ts-ignore
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-fname-register">First name</InputLabel>

                  <OutlinedInput
                    id="outlined-adornment-fname-register"
                    type="text"
                    value={values.fname}
                    name="fname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />

                  {touched.fname && errors.fname && (
                    // @ts-ignore
                    <FormHelperText error>{errors.fname}</FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl
                  fullWidth
                  error={Boolean(touched.lname && errors.lname)}
                  // @ts-ignore
                  sx={{ ...theme.typography.customInput }}
                >
                  <InputLabel htmlFor="outlined-adornment-lname-register">Last name</InputLabel>

                  <OutlinedInput
                    id="outlined-adornment-lname-register"
                    type="text"
                    value={values.lname}
                    name="lname"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    inputProps={{}}
                  />

                  {touched.lname && errors.lname && (
                    // @ts-ignore
                    <FormHelperText error>{errors.lname}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
            </Grid>

            {/* Email */}
            <FormControl
              fullWidth
              error={Boolean(touched.email && errors.email)}
              // @ts-ignore
              sx={{ ...theme.typography.customInput }}
            >
              <InputLabel htmlFor="outlined-adornment-email-register">Email Address</InputLabel>

              <OutlinedInput
                id="outlined-adornment-email-register"
                type="email"
                value={values.email}
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
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
              <InputLabel htmlFor="outlined-adornment-password-register">Password</InputLabel>

              <OutlinedInput
                id="outlined-adornment-password-register"
                type={showPassword ? 'text' : 'password'}
                value={values.password}
                name="password"
                label="Password"
                onBlur={handleBlur}
                onChange={(e) => {
                  handleChange(e);
                  changePassword(e.target.value);
                }}
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
                inputProps={{}}
              />

              {touched.password && errors.password && (
                // @ts-ignore
                <FormHelperText error>{errors.password}</FormHelperText>
              )}
            </FormControl>

            {strength !== 0 && (
              <FormControl fullWidth>
                <Box sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item>
                      <Box
                        style={{ backgroundColor: level.color }}
                        sx={{ width: 85, height: 8, borderRadius: '7px' }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1" fontSize="0.75rem">
                        {level.label}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </FormControl>
            )}

            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                {/* @ts-ignore */}
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}

            {/*{ Submit error}*/}
            {formErrors && (
              <Box>
                <FormHelperText error>{formErrors}</FormHelperText>
              </Box>
            )}

            <Box sx={{ mt: 2 }}>
              <Button
                disableElevation
                disabled={isSubmitting || isLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
                color="secondary"
              >
                {isLoading ? 'Loading...' : 'Sign up'}
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </>
  );
};

export default RegistrationForm;
