'use client'

import { FC, useState, useContext } from "react";
import { useTheme } from '@mui/material/styles';
import { Tabs, Tab, Typography, Box, Avatar, Input, Button } from '@mui/material';
import { AuthProvider } from "@/context/AuthContext";
import { AuthContext } from "@/context/AuthContext";

const ProfilePage: FC = () => {
  const { user, updateUser } = useContext(AuthContext);
  const theme = useTheme();
  const [newUsername, setNewUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');

  const [value, setValue] = useState(0);

  const handlePageChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value);
  };

  const handleUsernameSubmit = async () => {
    const error = validateUsername(newUsername);
    if (error) {
      setUsernameError(error);
      return;
    }
    setUsernameError('');

    try {
      await updateUser({ username: newUsername }, user.id);
      setNewUsername('')
    } catch (error) {
      console.error('Failed to update user data:', error.message);
    }
  };

  const validateUsername = (username: string) => {
    if (!username) {
      return 'UserName cannot be empty';
    }
    if (username.length < 3 || username.length > 20) {
      return 'Username must be between 3 and 20 characters';
    }
    return '';
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
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 3,
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
            }}>
              <Avatar
                alt="Profile Photo"
                sx={{
                  width: '7vw',
                  height: '7vw',
                  border: `1px solid ${theme.palette.secondary.main}`
                }}>
                A
              </Avatar>
              <Typography
                sx={{
                  ml: '6vw',
                  fontSize: '26px',
                }}>
                <h3>{user?.username}</h3>
              </Typography>
            </Box>

            <Box sx={{
              display: "flex",
              alignItems: 'center',
              gap: '6vw',
              mt: 4,
            }}>
              <Typography
                sx={{ width: '5vw' }}>
                <p>UserName</p>
              </Typography>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': {
                    m: 1,
                  },
                }}

                noValidate
                autoComplete="off"
              >
                <Input
                  placeholder="UserName"
                  value={newUsername}
                  onChange={handleUsernameChange}
                  sx={{
                    ':after': { borderBottomColor: theme.palette.secondary.main },
                  }}
                />
              </Box>
            </Box>
            {usernameError && (
              <Typography color="error" variant="body2">
                {usernameError}
              </Typography>
            )}

            <Box sx={{
              display: "flex",
              alignItems: 'center',
              gap: '6vw',

            }}>
              <Typography
                sx={{ width: '5vw' }}>
                <p>Password</p>
              </Typography>
              <Box
                component="form"
                sx={{
                  '& > :not(style)': {
                    m: 1,
                  },
                }}

                noValidate
                autoComplete="off"
              >
                <Input placeholder="Password"
                  sx={{
                    ':after': { borderBottomColor: theme.palette.secondary.main },
                  }}
                />
              </Box>
            </Box>

            <Button
              variant="contained"
              onClick={handleUsernameSubmit}
              sx={{
                backgroundColor: theme.palette.secondary.light,
                color: theme.palette.secondary.main,
                width: '10vw',
                mt: 4,

                '&:hover': {
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.light,
                }
              }}>
              Success
            </Button>

          </Box>

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

export default ProfilePage;


