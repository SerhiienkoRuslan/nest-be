import { FC } from 'react';

import { styled } from '@mui/material/styles';
import {
  Avatar,
  Grid,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Typography,
} from '@mui/material';

const ListItemWrapper = styled('div')(({ theme }) => ({
  cursor: 'pointer',
  padding: 16,
  '&:hover': {
    background: theme.palette.primary.light,
  },
  '& .MuiListItem-root': {
    padding: 0,
  },
}));

type Props = {
  notification: string;
};

const NotificationItem: FC<Props> = ({ notification }) => {
  // TODO: should be integrated
  console.log('notification', notification);
  return (
    <ListItemWrapper>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Some Text" />
        </ListItemAvatar>

        <ListItemText primary="Some Text" />

        <ListItemSecondaryAction>
          <Grid container justifyContent="flex-end">
            <Grid item xs={12}>
              <Typography variant="caption" display="block" gutterBottom>
                2 min ago
              </Typography>
            </Grid>
          </Grid>
        </ListItemSecondaryAction>
      </ListItem>

      <Grid container direction="column" className="list-container">
        <Grid item xs={12} sx={{ pb: 2 }}>
          <Typography variant="subtitle2">
            It is a long established fact that a reader will be distracted
          </Typography>
        </Grid>
      </Grid>
    </ListItemWrapper>
  );
};

export default NotificationItem;
