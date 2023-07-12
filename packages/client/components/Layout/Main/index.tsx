// @ts-check
import { useContext } from 'react';

import { styled, useTheme } from '@mui/material/styles';
import { drawerWidth } from '@/constants';
import { GlobalContext } from '@/context/global';

// import Breadcrumbs from '@/components/Breadcrumbs';
// import navigation from 'menu-items';

const MainComponent = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  // @ts-ignore
  ...theme.typography.mainContent,
  ...(!open && {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
      width: `calc(100% - ${drawerWidth}px)`,
      padding: '16px',
      marginRight: '10px',
    },
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: `calc(100% - ${drawerWidth}px)`,
    [theme.breakpoints.down('md')]: {
      marginLeft: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      marginLeft: '10px',
    },
  }),
}));

const Main = ({ children }) => {
  const theme = useTheme();
  const { isNavigationOpen } = useContext(GlobalContext);

  return (
    // @ts-ignore
    <MainComponent theme={theme} open={isNavigationOpen}>
      {/*<Breadcrumbs*/}
      {/*  navigation={navigation}*/}
      {/*  icon*/}
      {/*  title*/}
      {/*  rightAlign*/}
      {/*/>*/}
      {children}
    </MainComponent>
  );
};

export default Main;
