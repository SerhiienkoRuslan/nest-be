import { FC, ReactElement, forwardRef } from 'react';

import { Card, CardContent, CardHeader, Divider, Typography } from '@mui/material';
// material-ui
import { useTheme } from '@mui/material/styles';

// constant
const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

type Props = {
  border?: boolean;
  boxShadow?: boolean;
  children: ReactElement;
  content?: boolean;
  contentClass?: string;
  contentSX?: any;
  darkTitle?: boolean;
  secondary?: any;
  shadow?: string;
  sx?: any;
  title?: any;
};

const MainCard: FC<Props> = forwardRef(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref,
  ) => {
    const theme = useTheme();

    return (
      <Card
        // @ts-ignore
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.primary[200] + 25,
          ':hover': {
            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit',
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {title && (
          <>
            <CardHeader
              sx={headerSX}
              title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
              action={secondary}
            />

            <Divider />
          </>
        )}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}

        {!content && children}
      </Card>
    );
  },
);

export default MainCard;
