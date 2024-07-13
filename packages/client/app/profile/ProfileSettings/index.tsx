import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import { Form, FormikProvider, useFormik } from 'formik';
import { FC, useContext, useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import FormRow from './formRow';

import { Box, CircularProgress, FormControlLabel, Grid, Radio, RadioGroup } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { FormicTextField } from '@/components/FormikTextField';
import { SubmitButton } from '@/components/SubmitButton';
import { AuthContext } from '@/context/AuthContext';
import { profileSettingsValidation } from '@/utils/validation/profileSettingsValidation';

const ProfileSettings: FC = () => {
  const { user, updateUser } = useContext(AuthContext);
  const theme: Theme = useTheme();

  const [countryCode, setCountryCode] = useState<string>('');

  useEffect(() => {
    const fetchCountryCode = async () => {
      const response = await axios.get('https://ipapi.co/json/');
      setCountryCode(response.data.country_code.toLowerCase());
    };
    fetchCountryCode();
  }, []);

  const handleSubmit = async (
    values: {
      username: string;
      phone: string;
      gender: string;
      birthday: Dayjs;
      location: string;
      interests: string;
      bio: string;
    },
    { setErrors },
  ) => {
    try {
      if (user) {
        await updateUser(user.id, {
          ...values,
          birthday: values.birthday.toDate(),
        });
      }
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const formik = useFormik({
    initialValues: {
      username: user?.username || '',
      phone: user?.phone || '',
      gender: user?.gender || '',
      birthday: user?.birthday ? dayjs(user.birthday) : dayjs(),
      location: user?.location || '',
      interests: user?.interests || '',
      bio: user?.bio || '',
    },
    validationSchema: profileSettingsValidation,
    onSubmit: handleSubmit,
  });

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
          <Form onSubmit={formik.handleSubmit} autoComplete="off">
            {/* Field: Your Name */}
            <FormRow label="Your Name">
              <FormicTextField
                name="username"
                type="text"
                label={user?.username}
                color="secondary"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                  },
                }}
              />
            </FormRow>

            {/* Field: Gender */}
            <FormRow label="Gender">
              <RadioGroup
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                row
              >
                <FormControlLabel
                  value="male"
                  control={
                    <Radio sx={{ '&.Mui-checked': { color: theme.palette.secondary.main } }} />
                  }
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={
                    <Radio sx={{ '&.Mui-checked': { color: theme.palette.secondary.main } }} />
                  }
                  label="Female"
                />
              </RadioGroup>
            </FormRow>

            {/* Field:Date of Birth */}
            <FormRow label="Date of Birth">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select date"
                  sx={{
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: { color: theme.palette.secondary.main },
                    },
                    '& .MuiOutlinedInput-root': {
                      '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                    },
                  }}
                  value={formik.values.birthday}
                  onChange={(date) => formik.setFieldValue('birthday', date)}
                />
              </LocalizationProvider>
            </FormRow>

            {/* Field: Location */}

            <FormRow label="Location">
              <FormicTextField
                type="text"
                name="location"
                color="secondary"
                label="Enter your location"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                  },
                }}
              />
            </FormRow>

            {/* Field: Phone number */}
            <FormRow label="Phone number">
              <PhoneInput
                country={
                  user?.phone ? (user.phone.length > 0 ? undefined : countryCode) : countryCode
                }
                enableSearch={true}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue('phone', phone)}
                inputStyle={{
                  width: '100%',
                  minWidth: '100%',
                  backgroundColor: 'rgba(248, 250, 252, 1)',
                }}
              />
            </FormRow>

            {/* Field: Your interests */}
            <FormRow label="Your interests">
              <FormicTextField
                type="text"
                name="interests"
                label="Your interests"
                color="secondary"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                  },
                }}
              />
            </FormRow>

            {/* Field Bio */}
            <FormRow label="Bio">
              <FormicTextField
                name="bio"
                label="Tell us about yourself"
                color="secondary"
                multiline
                rows={4}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main },
                  },
                }}
              />
            </FormRow>

            {/* save button */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <SubmitButton
                sx={{
                  width: '10vw',
                  mt: 4,
                }}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Submitting...' : 'Save'}
              </SubmitButton>

              {formik.isSubmitting && (
                <CircularProgress
                  sx={{
                    width: '10vw',
                    height: '1vh',
                    marginTop: '20px',
                    color: theme.palette.secondary.main,
                  }}
                />
              )}
            </Box>
          </Form>
        </FormikProvider>
      </Grid>
    </Grid>
  );
};

export default ProfileSettings;
