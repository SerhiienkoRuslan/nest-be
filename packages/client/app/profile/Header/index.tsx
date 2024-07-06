import { FC, useContext } from "react"
import { Box, Avatar, Typography } from "@mui/material"
import { useTheme, Theme } from '@mui/material/styles';
import { AuthContext } from "@/context/AuthContext";

const ProfileHeader: FC = () => {
  const { user } = useContext(AuthContext);
  const theme: Theme = useTheme();

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ml: 10
    }}>
      <Avatar
        alt="Profile Photo"
        sx={{
          width: '7vw',
          height: '7vw',
          border: `1px solid ${theme.palette.secondary.main}`
        }}>
        {user?.username.charAt(0).toUpperCase()}
      </Avatar>
      <Typography
        variant="h3"
        sx={{
          ml: '6vw',
          fontSize: '26px',
        }}>
        {user?.username}
      </Typography>
    </Box>
  )
}

export default ProfileHeader