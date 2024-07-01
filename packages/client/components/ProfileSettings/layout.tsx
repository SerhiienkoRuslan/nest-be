'use client'

import { FC, useState } from "react";
import UserSettings from "./UserSettings/UserSettings";
import { useTheme, Theme } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { AuthProvider } from "@/context/AuthContext";

const ProfileSettings: FC = () => {
  const theme: Theme = useTheme();
  const [value, setValue] = useState<number>(0);

  const handlePageChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <AuthProvider>
        <Tabs value={value}
          onChange={handlePageChange}
          aria-label="simple tabs example"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: theme.palette.secondary.main,
            },
            '& .MuiTab-root': {
              color: theme.palette.secondary.main,
              borderRadius: '5px',
              '&.Mui-selected': {
                color: theme.palette.secondary.main,
              },
            },
          }}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />

        </Tabs>

        {value === 0 && (
          <UserSettings />
        )}

        {value === 1 && (
          <Box p={3}>
            <Typography>Item Two Content</Typography>
          </Box>
        )}

        {value === 2 && (
          <Box p={3}>
            <Typography>Item Three Content</Typography>
          </Box>
        )}
      </AuthProvider>
    </>
  );
};

export default ProfileSettings;


