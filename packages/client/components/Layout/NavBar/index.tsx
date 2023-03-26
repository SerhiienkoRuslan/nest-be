import { FC, useContext } from 'react';

import { AppBar, Toolbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { GlobalContext } from '@/context/global';

import Header from './Header';

const NavBar: FC = () => {
  const theme = useTheme();
  const { isNavigationOpen } = useContext(GlobalContext);

  return (
    <AppBar
      enableColorOnDark
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        bgcolor: theme.palette.background.default,
        transition: isNavigationOpen
          ? theme.transitions.create('width')
          : 'none',
      }}
    >
      <Toolbar>
        <Header />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
