'use client'

import { FC, useState, useContext } from "react";
import UserSettings from "./UserSettings/UserSettings";
import { useTheme, Theme } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box, Avatar } from '@mui/material';
import { AuthContext } from "@/context/AuthContext";

const ProfileLayout: FC = () => {
  const theme: Theme = useTheme();
  const [value, setValue] = useState<number>(0);
  const { user } = useContext(AuthContext);

  const handlePageChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Avatar
            alt="Profile Photo"
            sx={{
              width: '7vw',
              height: '7vw',
              border: `1px solid ${theme.palette.secondary.main}`
            }}>
            {user?.username.charAt(0).toUpperCase()}
          </Avatar>
          <Typography
            variant="h3"
            sx={{
              ml: '6vw',
              fontSize: '26px',
            }}>
            {user?.username}
          </Typography>
        </Box>

        <Box>
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
                margin: '0 5px',
                '&.Mui-selected': {
                  color: theme.palette.secondary.main,
                },
              },
            }}>
            <Tab label="Edit Profile" />
            <Tab label="Change Password" />
            {/* <Tab label="Item Three" /> */}
          </Tabs>
        </Box>
      </Box>
      {
        value === 0 && (
          <UserSettings />
        )
      }

      {
        value === 1 && (
          <Box p={3}>
            <Typography>Item Two Content</Typography>
          </Box>
        )
      }

      {/* {
        value === 2 && (
          <Box p={3}>
            <Typography>Item Three Content</Typography>
          </Box>
        )
      } */}
    </>
  );
};

export default ProfileLayout;


