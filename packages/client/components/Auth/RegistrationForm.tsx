'use client';
import { FC, useState } from 'react';
import { Formik } from 'formik';

import { useTheme } from '@mui/material/styles';
import {
  Grid,
  Box,
  Button,
  FormControl,
  TextField,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
  useMediaQuery,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { registrationValidation } from '@/utils/validation';
import { strengthColor, strengthIndicator } from '@/utils/password-strength';

const initialValues = {
  email: '',
  password: '',
  submit: null,
};

const RegistrationForm: FC = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const [showPassword, setShowPassword] = useState(false);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState({
    label: '',
    color: '',
  });

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
      validationSchema={registrationValidation}
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
          {/* First name & Last name */}
          <Grid container spacing={matchDownSM ? 0 : 2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                margin="normal"
                name="fname"
                type="text"
                defaultValue=""
                // @ts-ignore
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                margin="normal"
                name="lname"
                type="text"
                defaultValue=""
                // @ts-ignore
                sx={{ ...theme.typography.customInput }}
              />
            </Grid>
          </Grid>

          {/* Email */}
          <FormControl
            fullWidth
            error={Boolean(touched.email && errors.email)}
            // @ts-ignore
            sx={{ ...theme.typography.customInput }}
          >
            <InputLabel htmlFor="outlined-adornment-email-register">
              Email Address / Username
            </InputLabel>

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
            <InputLabel htmlFor="outlined-adornment-password-register">
              Password
            </InputLabel>

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
              Sign up
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
