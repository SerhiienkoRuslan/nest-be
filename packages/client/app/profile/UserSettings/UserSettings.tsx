import { FC, useContext } from "react";
import { useTheme, Theme } from '@mui/material/styles';
import { AuthContext } from "@/context/AuthContext";
import { Typography, Box, Input, Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useFormik } from 'formik';
import { profileSettingsValidation } from "@/utils/validation/profileSettingsValidation";

const UserSettings: FC = () => {
  const { user, updateUser, isLoading } = useContext(AuthContext);
  const theme: Theme = useTheme();

  const handleSubmit = async (values: { username: string }, { setSubmitting, setErrors, resetForm }) => {
    try {
      await updateUser({ username: values.username }, user.id);
      resetForm();
    } catch (error) {
      console.error('Failed to update user data:', error.message);
      setErrors({ submit: error.message });
    }
    setSubmitting(false);
  };

  const formik = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema: profileSettingsValidation,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} autoComplete="off">
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}>

          <Box sx={{
            display: "flex",
            alignItems: 'center',
            gap: '6vw',
            mt: 4,
          }}>
            <Box
              sx={{
                minWidth: '5vw',
              }}>
              <Typography
                variant="body1">
                Your Name
              </Typography>
            </Box>
            <Input
              type="text"
              name="username"
              placeholder={user?.username}
              value={formik.values.username}
              onChange={formik.handleChange}
              sx={{ ':after': { borderBottomColor: theme.palette.secondary.main } }}
            />
          </Box>

          {formik.touched.username && formik.errors.username && (
            <Typography color="error" variant="body2">
              {formik.errors.username}
            </Typography>
          )}

          {!isLoading &&
            < Button
              variant="contained"
              type="submit"
              disabled={isLoading}
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.secondary.main,
                width: '10vw',
                mt: 4,
                '&:hover': {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.light,
                },
              }}>
              Save
            </Button>
          }

          {isLoading &&
            <LinearProgress sx={{
              width: '10vw',
              height: '1vh',
              marginTop: '20px',
              '& .MuiLinearProgress-bar': {
                backgroundColor: theme.palette.secondary.main,
              },
            }} />
          }
        </Box>
      </form>
    </>
  );
};

export default UserSettings;