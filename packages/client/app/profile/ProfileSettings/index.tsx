import dayjs, { Dayjs } from 'dayjs';
import { Form, FormikProvider, useFormik } from 'formik';
import { FC, useContext } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import FormRow from './formRow';

import { Box, CircularProgress, Grid } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { FormicDatePicker } from '@/components/FormikComponents/FormikDatePicker';
import { FormikRadioGroup } from '@/components/FormikComponents/FormikRadioGroup';
import { FormicTextField } from '@/components/FormikComponents/FormikTextField';
import { SubmitButton } from '@/components/SubmitButton/SubmitButton';
import { AuthContext } from '@/context/AuthContext';
import { useCountryCode } from '@/hooks/useCountryCode';
import { profileSettingsValidation } from '@/utils/validation/profileSettingsValidation';

const ProfileSettings: FC = () => {
  const { user, updateUser } = useContext(AuthContext);
  const theme: Theme = useTheme();
  const countryCode = useCountryCode();

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
      gender: user?.gender || 'male',
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
              <FormicTextField name="username" type="text" label={user?.username} />
            </FormRow>

            {/* Field: Gender */}
            <FormRow label="Gender">
              <FormikRadioGroup
                name="gender"
                options={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
                row
              />
            </FormRow>

            {/* Field:Date of Birth */}
            <FormRow label="Date of Birth">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <FormicDatePicker name="birthday" label="Select date" />
              </LocalizationProvider>
            </FormRow>

            {/* Field: Location */}

            <FormRow label="Location">
              <FormicTextField
                type="text"
                name="location"
                color="secondary"
                label="Enter your location"
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
                type="submit"
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
