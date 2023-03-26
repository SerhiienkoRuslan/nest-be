'use client';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import './global.css';

import theme from '@/theme';
import { GlobalProvider } from '@/context/global';

import NavBar from '@/components/Layout/NavBar';
import Sidebar from '@/components/Layout/Sidebar';
import Main from '@/components/Layout/Main';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>NestBE</title>
        <meta name="description" content="Ruslan Serhiienko" />
      </head>

      <GlobalProvider>
        <ThemeProvider theme={theme()}>
          <CssBaseline />
          <body>
            <Box sx={{ display: 'flex' }}>
              <NavBar />
              <Sidebar />
              <Main>{children}</Main>
            </Box>
          </body>
        </ThemeProvider>
      </GlobalProvider>
    </html>
  );
};

export default Layout;
