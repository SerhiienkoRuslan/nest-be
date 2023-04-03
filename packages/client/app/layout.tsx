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
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
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
