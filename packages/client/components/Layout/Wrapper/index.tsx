import { useContext } from 'react';
import { Box } from '@mui/material';

import NavBar from '@/components/Layout/NavBar';
import Sidebar from '@/components/Layout/Sidebar';
import Main from '@/components/Layout/Main';

import { AuthContext } from '@/context/AuthContext';

const Wrapper = ({ children }) => {
  const { isLogIn } = useContext(AuthContext);

  if (!isLogIn) {
    return children;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      <Sidebar />
      <Main>{children}</Main>
    </Box>
  );
};

export default Wrapper;
