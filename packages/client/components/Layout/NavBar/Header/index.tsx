import { useContext } from 'react';
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { GlobalContext } from '@/context/global';

import LogoSection from '../../../LogoSection';
import SearchSection from '../SearchSection';
import ProfileSection from '../ProfileSection';
import NotificationSection from '../NotificationSection';

const Header = () => {
  const theme = useTheme();
  const { setNavigationOpen } = useContext(GlobalContext);

  const handleLeftDrawerToggle = () => setNavigationOpen((prev) => !prev);

  return (
    <>
      {/* Logo & Toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>
        <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              transition: 'all .2s ease-in-out',
              background: theme.palette.secondary.light,
              color: theme.palette.secondary.dark,
              '&:hover': {
                background: theme.palette.secondary.dark,
                color: theme.palette.secondary.light,
              },
            }}
            onClick={handleLeftDrawerToggle}
            color="inherit"
          >
            <MenuIcon />
          </Avatar>
        </ButtonBase>
      </Box>

      {/* Search */}
      <SearchSection />
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />

      {/* Notification */}
      <NotificationSection />

      {/* Profile */}
      <ProfileSection />
    </>
  );
};

export default Header;
