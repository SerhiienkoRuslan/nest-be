import { useTheme } from '@mui/material/styles';
import { Divider, List } from '@mui/material';

import NotificationItem from './NotificationItem';

const NotificationList = () => {
  const theme = useTheme();
  const notificationList = ['1', '2', '3', '4', '5', '6'];

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 330,
        py: 0,
        borderRadius: '10px',
        [theme.breakpoints.down('md')]: {
          maxWidth: 300,
        },
        '& .MuiListItemSecondaryAction-root': {
          top: 22,
        },
        '& .MuiDivider-root': {
          my: 0,
        },
        '& .list-container': {
          pl: 7,
        },
      }}
    >
      {notificationList?.length &&
        notificationList.map((notification) => (
          <>
            <NotificationItem notification={notification} />
            <Divider />
          </>
        ))}
    </List>
  );
};

export default NotificationList;
