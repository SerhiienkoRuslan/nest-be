'use client';

import { FC, ReactElement } from 'react';
import Link from 'next/link';

import {
  Box,
  Button,
  Divider,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import GoogleButton, { GoogleButtonType } from '@/components/Auth/GoogleButton';

type Props = {
  children: ReactElement;
  title: string;
  subtitle: string;
  link: {
    href: string;
    text: string;
  };
  googleBtnProps: GoogleButtonType;
};

const AuthContent: FC<Props> = ({
  children,
  title,
  subtitle,
  link,
  googleBtnProps,
}) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <>
      <Grid item xs={12}>
        <Grid
          container
          direction={matchDownSM ? 'column-reverse' : 'row'}
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <Stack alignItems="center" justifyContent="center" spacing={1}>
              <Typography
                color={theme.palette.secondary.main}
                gutterBottom
                variant={matchDownSM ? 'h3' : 'h2'}
              >
                {title}
              </Typography>

              <Typography
                variant="caption"
                fontSize="16px"
                textAlign={matchDownSM ? 'center' : 'inherit'}
              >
                Enter your credentials to continue
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item xs={12}>
            <GoogleButton {...googleBtnProps} />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ alignItems: 'center', display: 'flex' }}>
              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

              <Button
                variant="outlined"
                sx={{
                  cursor: 'unset',
                  m: 2,
                  py: 0.5,
                  px: 7,
                  borderColor: `${theme.palette.grey[100]} !important`,
                  color: `${theme.palette.grey[900]}!important`,
                  fontWeight: 500,
                  // @ts-ignore
                  borderRadius: `${theme.borderRadius}px`,
                }}
                disableRipple
                disabled
              >
                OR
              </Button>

              <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            container
            alignItems="center"
            justifyContent="center"
          >
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle1">{subtitle}</Typography>
            </Box>
          </Grid>
        </Grid>

        {children}
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      <Grid item xs={12}>
        <Grid item container direction="column" alignItems="center" xs={12}>
          <Typography
            component={Link}
            href={link.href}
            variant="subtitle1"
            sx={{ textDecoration: 'none' }}
          >
            {link.text}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthContent;
