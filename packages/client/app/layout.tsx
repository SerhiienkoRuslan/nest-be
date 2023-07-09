'use client';
import Providers from '@/context/Providers';
import { ThemeProvider, CssBaseline } from '@mui/material';
import './global.css';

import theme from '@/theme';
import { GlobalProvider } from '@/context/global';
import { AuthProvider } from '@/context/AuthContext';

import Wrapper from '@/components/Layout/Wrapper';
import React from 'react';

const Layout = ({ children }: { children: React.ReactNode }) => {
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
      <Providers>
        <AuthProvider>
          <GlobalProvider>
            <ThemeProvider theme={theme()}>
              <CssBaseline />
              <body>
                <Wrapper>{children}</Wrapper>
              </body>
            </ThemeProvider>
          </GlobalProvider>
        </AuthProvider>
      </Providers>
    </html>
  );
};

export default Layout;
