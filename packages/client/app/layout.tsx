'use client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Hydrate } from 'react-query';
import './global.css';

import theme from '@/theme';

import { GlobalProvider } from '@/context/global';
import { AuthProvider } from '@/context/AuthContext';
import ReactQueryWrapper from '@/context/ReactQueryWrapper';

import Wrapper from '@/components/Layout/Wrapper';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>NestBE</title>
        <meta name="description" content="Ruslan Serhiienko" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <ReactQueryWrapper>
        <AuthProvider>
          <Hydrate>
            <GlobalProvider>
              <ThemeProvider theme={theme()}>
                <CssBaseline />
                <body id="app">
                  <Wrapper>{children}</Wrapper>
                </body>
              </ThemeProvider>
            </GlobalProvider>
          </Hydrate>
        </AuthProvider>
      </ReactQueryWrapper>
    </html>
  );
};

export default Layout;
