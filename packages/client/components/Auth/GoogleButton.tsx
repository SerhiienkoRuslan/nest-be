import { FC } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Button, useMediaQuery } from '@mui/material';
import GoogleIcon from '@/public/social-google.svg';

export type GoogleButtonType = {
  text: string;
  isLogin?: boolean;
};

const GoogleButton: FC<GoogleButtonType> = ({ text, isLogin = false }) => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  const handleClick = () => {
    if (isLogin) {
      console.log('isLogin', isLogin);
    } else {
      console.log('isLogin', isLogin);
    }
  };

  return (
    <Button
      disableElevation
      fullWidth
      onClick={handleClick}
      size="large"
      variant="outlined"
      sx={{
        color: 'grey.700',
        backgroundColor: theme.palette.grey[50],
        borderColor: theme.palette.grey[100],
      }}
    >
      <Box sx={{ mr: { xs: 1, sm: 2, width: 20 } }}>
        <img
          src={GoogleIcon}
          alt="google"
          width={16}
          height={16}
          style={{ marginRight: matchDownSM ? 8 : 16 }}
        />
      </Box>
      {text}
    </Button>
  );
};

export default GoogleButton;
