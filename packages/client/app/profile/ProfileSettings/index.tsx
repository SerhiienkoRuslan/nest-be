import { FC, useContext, useEffect, useState } from "react";
import { useFormik } from 'formik';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios'
import PhoneInput from 'react-phone-input-2'

import { useTheme, Theme } from '@mui/material/styles';
import { Typography, Box, Input, Button, CircularProgress, RadioGroup, FormControlLabel, Radio, TextField, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { AuthContext } from "@/context/AuthContext";
import { profileSettingsValidation } from "@/utils/validation/profileSettingsValidation";

import FormRow from "./formRow";

import 'react-phone-input-2/lib/style.css'


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

  const handleSubmit = async (values: {
    username: string,
    phone: string,
    gender: string,
    birthday: Dayjs,
    location: string,
    interests: string,
    bio: string,
  }, { setErrors }) => {

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
      bio: user?.bio || ''
    },
    validationSchema: profileSettingsValidation,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="off">
      <Grid container sx={{
        mt: 5,
        ml: 4,
      }}>
        <Grid item xs={4}>

          {/* Field: Your Name */}
          <FormRow label='Your Name'>
            <Input
              sx={{
                ':after': { borderBottomColor: theme.palette.secondary.main },
              }}
              type="text"
              name="username"
              placeholder={user?.username}
              value={formik.values.username}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            />
          </FormRow>

          {formik.touched.username && formik.errors.username && (
            <Typography sx={{
              textAlign: 'left',
              alignItems: 'center'
            }}
              color="error"
              variant="body2">{formik.errors.username}</Typography>
          )}

          {/* Field: Gender */}
          <FormRow label='Gender'>
            <RadioGroup
              name="gender"
              value={formik.values.gender}
              onChange={formik.handleChange}
              row
            >
              <FormControlLabel
                value="male"
                control={<Radio sx={{ '&.Mui-checked': { color: theme.palette.secondary.main } }} />}
                label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio sx={{ '&.Mui-checked': { color: theme.palette.secondary.main } }} />}
                label="Female" />
            </RadioGroup>
          </FormRow>

          {/* Field:Date of Birth */}
          <FormRow label='Date of Birth'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{
                  '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main } },
                }}
                value={formik.values.birthday}
                onChange={(date) => formik.setFieldValue('birthday', date)}
              />
            </LocalizationProvider>
          </FormRow>

          {/* Field: Location */}
          <FormRow label='Location'>
            <TextField
              type="text"
              name="location"
              placeholder="Enter your location"
              value={formik.values.location}
              onChange={formik.handleChange}
              sx={{
                '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main } }
              }}
            />
          </FormRow>

          {/* Field: Phone number */}
          <FormRow label='Phone number'>
            <PhoneInput
              country={user?.phone ? (user.phone.length > 0 ? undefined : countryCode) : countryCode}
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
          <FormRow label='Your interests'>
            <TextField
              type="text"
              name="interests"
              placeholder="Your interests"
              value={formik.values.interests}
              onChange={formik.handleChange}
              sx={{
                '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main } }
              }}
            />
          </FormRow>

          {/* Поле Bio */}
          <FormRow label='Bio'>
            <TextField
              name="bio"
              placeholder="Tell us about yourself"
              multiline
              rows={4}
              value={formik.values.bio}
              onChange={formik.handleChange}
              sx={{
                '& .MuiOutlinedInput-root': { '&.Mui-focused fieldset': { borderColor: theme.palette.secondary.main } }
              }}
            />
          </FormRow>

          {/* save button */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
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
              }}
            >
              Save
            </Button>

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
        </Grid>
      </Grid>
    </form>
  );
};

export default ProfileSettings;
