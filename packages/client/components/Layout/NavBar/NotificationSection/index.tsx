import { useState, useRef, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Button,
  ButtonBase,
  CardActions,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  Paper,
  Popper,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

import MainCard from '@/components/MainCard';
import Transitions from '@/components/Transitions';
import { notificationStatuses } from '@/constants';

import NotificationList from './NotificationList';

const NotificationSection = () => {
  const theme = useTheme();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const handleChange = (event) => {
    if (event?.target.value) {
      setValue(event?.target.value);
    }
  };

  return (
    <>
      {/* Notification button */}
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2,
          },
        }}
      >
        <ButtonBase sx={{ borderRadius: '12px' }}>
          <Avatar
            variant="rounded"
            sx={{
              // @ts-ignore
              ...theme.typography.commonAvatar,
              // @ts-ignore
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&[aria-controls="menu-list-grow"],&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
            color="inherit"
          >
            <NotificationsNoneOutlinedIcon />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* Notification popup */}
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
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
                offset: [matchesXs ? 5 : 0, 20],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} content={false} boxShadow shadow={theme.shadows[16]}>
                  <>
                    <Grid container direction="column" spacing={2}>
                      {/* Head links */}
                      <Grid item xs={12}>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ pt: 2, px: 2 }}
                        >
                          <Grid item>
                            <Stack direction="row" spacing={2}>
                              <Typography variant="subtitle1">All Notification</Typography>
                              <Chip
                                size="small"
                                label="01"
                                sx={{
                                  color: theme.palette.background.default,
                                  bgcolor: theme.palette.warning.dark,
                                }}
                              />
                            </Stack>
                          </Grid>
                          <Grid item>
                            <Typography variant="subtitle2" color="primary">
                              Mark as all read
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12}>
                        <PerfectScrollbar
                          style={{
                            height: '100%',
                            maxHeight: 'calc(100vh - 205px)',
                            overflowX: 'hidden',
                          }}
                        >
                          {/* Filter */}
                          <Grid container direction="column" spacing={2}>
                            <Grid item xs={12}>
                              <Box sx={{ px: 2, pt: 0.25 }}>
                                <TextField
                                  id="outlined-select-currency-native"
                                  select
                                  fullWidth
                                  value={value}
                                  onChange={handleChange}
                                  SelectProps={{
                                    native: true,
                                  }}
                                >
                                  {notificationStatuses.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </TextField>
                              </Box>
                            </Grid>

                            <Grid item xs={12} p={0}>
                              <Divider sx={{ my: 0 }} />
                            </Grid>
                          </Grid>

                          {/* Notification List */}
                          <NotificationList />
                        </PerfectScrollbar>
                      </Grid>
                    </Grid>

                    <Divider />

                    {/* View all btn */}
                    <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                      <Button size="small" disableElevation>
                        View All
                      </Button>
                    </CardActions>
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

export default NotificationSection;
