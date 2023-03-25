'use client';
import './global.css';
import { darkTheme } from '@/utils/muiTheme';
import { ThemeProvider, CssBaseline } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>NestBE</title>
        <meta name="description" content="Ruslan Serhiienko" />
      </head>

      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <body>
          <main>{children}</main>
        </body>
      </ThemeProvider>
    </html>
  );
};

export default Layout;
