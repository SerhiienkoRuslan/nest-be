'use client';

import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Grid } from '@mui/material';

import Logo from '@/components/Logo';

const AuthWrapper = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  minHeight: '100vh',
}));

const AuthLayout = ({ children }) => {
  const theme = useTheme();

  return (
    <AuthWrapper>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: '100vh' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <Card
                sx={{
                  borderColor: theme.palette.primary[200] + 25,
                  ':hover': {
                    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
                  },
                  maxWidth: { xs: 400, lg: 475 },
                  margin: { xs: 2.5, md: 3 },
                  '& > *': {
                    flexGrow: 1,
                    flexBasis: '50%',
                  },
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>
                  {/* LOGO */}
                  <Grid
                    item
                    sx={{
                      mb: 3,
                      alignItems: 'center',
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Logo />
                  </Grid>

                  {children}
                </Box>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default AuthLayout;
