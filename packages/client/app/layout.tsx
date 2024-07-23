'use client';

import { Hydrate } from 'react-query';

import './global.css';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';

import Wrapper from '@/components/Layout/Wrapper';
import { AuthProvider } from '@/context/AuthContext';
import ReactQueryWrapper from '@/context/ReactQueryWrapper';
import { GlobalProvider } from '@/context/global';
import theme from '@/theme';

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
                <AppRouterCacheProvider>
                  <body id="app">
                    <Wrapper>{children}</Wrapper>
                  </body>
                </AppRouterCacheProvider>
              </ThemeProvider>
            </GlobalProvider>
          </Hydrate>
        </AuthProvider>
      </ReactQueryWrapper>
    </html>
  );
};

export default Layout;
