'use client';

import { FC, ReactElement } from 'react';
import Link from 'next/link';

import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type Props = {
  children: ReactElement;
  title: string;
  subtitle: string;
  link: {
    href: string;
    text: string;
  };
};

const AuthContent: FC<Props> = ({ children, title, subtitle, link }) => {
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
                {subtitle}
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
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
