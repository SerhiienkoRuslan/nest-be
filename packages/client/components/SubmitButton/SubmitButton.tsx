import { FC } from 'react';

import { Button, ButtonProps } from '@mui/material';
import { useTheme } from '@mui/material/styles';

type TSubmitButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  type: string;
} & ButtonProps;

export const SubmitButton: FC<TSubmitButtonProps> = ({
  children,
  disabled = false,
  sx,
  type,
  ...rest
}) => {
  const theme = useTheme();

  return (
    <Button
      color="primary"
      variant="contained"
      type={type}
      disabled={disabled}
      sx={{
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.secondary.main,
        '&:hover': {
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.light,
        },
        ...sx,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};
