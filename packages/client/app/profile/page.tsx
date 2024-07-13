'use client';

import { FC, useState } from 'react';

import ProfileHeader from './Header';
import ProfileChangePassword from './ProfileChangePassword';
import ProfileSettings from './ProfileSettings';

import { Box, Tab, Tabs } from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

const ProfilePage: FC = () => {
  const theme: Theme = useTheme();
  const [value, setValue] = useState<number>(0);

  const handlePageChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <ProfileHeader />

        <Box>
          <Tabs
            value={value}
            onChange={handlePageChange}
            aria-label="simple tabs example"
            sx={{
              '& .MuiTabs-indicator': {
                backgroundColor: theme.palette.secondary.main,
              },
              '& .MuiTab-root': {
                color: theme.palette.secondary.main,
                borderRadius: '5px',
                margin: '0 5px',
                '&.Mui-selected': {
                  color: theme.palette.secondary.main,
                },
              },
            }}
          >
            <Tab label="Edit Profile" />
            <Tab label="Change Password" />
          </Tabs>
        </Box>
      </Box>

      {value === 0 && <ProfileSettings />}

      {value === 1 && <ProfileChangePassword />}
    </>
  );
};

export default ProfilePage;
