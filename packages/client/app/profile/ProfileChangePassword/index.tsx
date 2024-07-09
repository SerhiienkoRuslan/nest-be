import { ChangeEvent, FC, useContext, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, Button, CircularProgress, IconButton, TextField, Typography } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { useFormik } from 'formik';

import { AuthContext } from "@/context/AuthContext";
import API from "@/lib/api";
import { strengthColor, strengthIndicator } from '@/utils/password-strength';
import { passwordValidation } from "@/utils/validation/passwordValidation";


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

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true)
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
        setMessage(error.response?.data?.message || 'An error occurred while changing the password');
      } finally {
        setSubmitting(false);
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
    <Box maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Change Password
      </Typography>

      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="currentPassword"
          name="currentPassword"
          label="Current Password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="off"
          margin="normal"
          value={formik.values.currentPassword}
          onChange={formik.handleChange}
          error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
          helperText={formik.touched.currentPassword && formik.errors.currentPassword}
          color="secondary"
        />

        <TextField
          fullWidth
          id="newPassword"
          name="newPassword"
          label="New Password"
          autoComplete="off"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          value={formik.values.newPassword}
          onChange={handleNewPasswordChange}
          error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
          helperText={formik.touched.newPassword && formik.errors.newPassword}
          color="secondary"
        />
        {formik.values.newPassword.length > 0 &&
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body2" style={{ color: level.color }}>
              {level.label}
            </Typography>
            <Box
              style={{ backgroundColor: level.color }}
              sx={{ width: 85, height: 8, borderRadius: '7px', ml: 1 }}
            />
          </Box>}

        <TextField
          fullWidth
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm New Password"
          autoComplete="off"
          type={showPassword ? 'text' : 'password'}
          margin="normal"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
          helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          color="secondary"
        />

        <Box sx={{
          justifyContent: 'space-between',
          display: 'flex',
          mt: '15px'
        }}>
          <Button color="primary"
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.secondary.main,
              '&:hover': {
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.secondary.light,
              },
            }}>
            Change Password
          </Button>

          <IconButton
            aria-label="toggle password visibility"
            onClick={handleShowPassword}
            edge="end"
            size="large"
          >
            {showPassword ? <VisibilityIcon /> : <VisibilityOff />}
          </IconButton>
        </Box>

        {formik.isSubmitting &&
          <Box sx={{
            m: '20px 0 0 50px'
          }}>
            <CircularProgress
              sx={{
                color: theme.palette.secondary.main,
              }} />
          </Box>
        }
      </form>

      {message && (
        <Box mt={2}>
          <Typography variant="body2" color={message.includes('successfully') ? theme.palette.success.dark : 'error'}>
            {message}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProfileChangePassword





