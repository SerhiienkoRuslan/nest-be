import { FC, useContext } from "react";
import { useTheme, Theme } from '@mui/material/styles';
import { AuthContext } from "@/context/AuthContext";
import { Typography, Box, Input, Button, CircularProgress } from '@mui/material';
import { useFormik } from 'formik';
import { profileSettingsValidation } from "@/utils/validation/profileSettingsValidation";

const ProfileSettings: FC = () => {
  const { user, updateUser } = useContext(AuthContext);
  const theme: Theme = useTheme();

  const handleSubmit = async (values: { username: string }, { setErrors }) => {

    try {
      if (user) {
        await updateUser(user.id, { username: values.username });
      }
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
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
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              sx={{ ':after': { borderBottomColor: theme.palette.secondary.main } }}
            />
          </Box>

          {formik.touched.username && formik.errors.username && (
            <Typography color="error" variant="body2">
              {formik.errors.username}
            </Typography>
          )}

          <Button
            variant="contained"
            type="submit"
            disabled={formik.isSubmitting}
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

          {formik.isSubmitting &&
            <CircularProgress
              sx={{
                width: '10vw',
                height: '1vh',
                marginTop: '20px',
                color: theme.palette.secondary.main
              }} />
          }
        </Box>
      </form>
    </>
  );
};

export default ProfileSettings;