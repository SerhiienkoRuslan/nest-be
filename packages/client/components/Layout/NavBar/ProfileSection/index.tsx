'use client';
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  OutlinedInput,
  Paper,
  Popper,
  Stack,
  Switch,
  Typography,
} from '@mui/material';

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import MainCard from '@/components/MainCard';
import Transitions from '@/components/Transitions';

const ProfileSection = () => {
  const theme = useTheme();
  const router = useRouter();

  const [sdm, setSdm] = useState(true);
  const [value, setValue] = useState('');
  const [notification, setNotification] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleLogout = async () => {
    console.log('Logout');
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const handleListItemClick = (event, index, route = '') => {
    setSelectedIndex(index);
    handleClose(event);

    if (route && route !== '') {
      router.push(route);
    }
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
      {/* User header button */}
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          borderColor: theme.palette.primary.light,
          backgroundColor: theme.palette.primary.light,
          '&[aria-controls="menu-list-grow"], &:hover': {
            borderColor: theme.palette.primary.main,
            background: `${theme.palette.primary.main}!important`,
            color: theme.palette.primary.light,
            '& svg': {
              stroke: theme.palette.primary.light,
            },
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            sx={{
              // @ts-ignore
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="inherit"
          />
        }
        label={<SettingsOutlinedIcon />}
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />

      {/* User modal */}
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard
                  border={false}
                  content={false}
                  boxShadow
                  shadow={theme.shadows[16]}
                >
                  <>
                    {/* User info */}
                    <Box sx={{ p: 2 }}>
                      <Stack>
                        <Stack
                          direction="row"
                          spacing={0.5}
                          alignItems="center"
                        >
                          <Typography variant="h4">Good Morning,</Typography>
                          <Typography
                            component="span"
                            variant="h4"
                            sx={{ fontWeight: 400 }}
                          >
                            User
                          </Typography>
                        </Stack>
                        <Typography variant="subtitle2">
                          Project Admin
                        </Typography>
                      </Stack>
                    </Box>

                    <Divider />

                    <Box sx={{ p: 2 }}>
                      {/* Allow notification */}
                      <Card
                        sx={{
                          bgcolor: theme.palette.primary.light,
                        }}
                      >
                        <CardContent>
                          <Grid container spacing={3} direction="column">
                            <Grid item>
                              <Grid
                                item
                                container
                                alignItems="center"
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="subtitle1">
                                    Allow Notifications
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <Switch
                                    checked={notification}
                                    onChange={(e) =>
                                      setNotification(e.target.checked)
                                    }
                                    name="sdm"
                                    size="small"
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </Card>
                      <Divider />

                      <List
                        component="nav"
                        sx={{
                          width: '100%',
                          maxWidth: 350,
                          minWidth: 300,
                          backgroundColor: theme.palette.background.paper,
                          borderRadius: '10px',
                          [theme.breakpoints.down('md')]: {
                            minWidth: '100%',
                          },
                          '& .MuiListItemButton-root': {
                            mt: 0.5,
                          },
                        }}
                      >
                        {/* User settings */}
                        <ListItemButton
                          sx={{
                            borderRadius: `${theme.borderRadius}px`,
                          }}
                          selected={selectedIndex === 0}
                          onClick={(event) =>
                            handleListItemClick(event, 0, '/user/profile')
                          }
                        >
                          <ListItemIcon>
                            <SettingsOutlinedIcon />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              <Typography variant="body2">
                                Account Settings
                              </Typography>
                            }
                          />
                        </ListItemButton>

                        {/* User posts */}
                        <ListItemButton
                          sx={{
                            borderRadius: '10px',
                          }}
                          selected={selectedIndex === 1}
                          onClick={(event) =>
                            handleListItemClick(event, 1, '/user/posts')
                          }
                        >
                          <ListItemIcon>
                            <PersonOutlineOutlinedIcon />
                          </ListItemIcon>

                          <ListItemText
                            primary={
                              <Grid
                                container
                                spacing={1}
                                justifyContent="space-between"
                              >
                                <Grid item>
                                  <Typography variant="body2">
                                    Social Profile
                                  </Typography>
                                </Grid>

                                <Grid item>
                                  <Chip
                                    label="02"
                                    size="small"
                                    sx={{
                                      bgcolor: theme.palette.warning.dark,
                                      color: theme.palette.background.default,
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            }
                          />
                        </ListItemButton>

                        {/* Logout button */}
                        <ListItemButton
                          sx={{
                            borderRadius: '10px',
                          }}
                          selected={selectedIndex === 4}
                          onClick={handleLogout}
                        >
                          <ListItemIcon>
                            <LogoutOutlinedIcon />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2">Logout</Typography>
                            }
                          />
                        </ListItemButton>
                      </List>
                    </Box>
                  </>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default ProfileSection;
