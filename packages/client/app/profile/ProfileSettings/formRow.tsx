import { Box, Typography } from "@mui/material"

const FormRow = ({ label, children }) => {
  return (
    <Box sx={{
      display: "flex",
      alignItems: 'center',
      gap: '2vw',
      mb: '20px',
      '& > *': { width: '100%' }
    }}>
      <Box sx={{
        width: '10vw',
        minWidth: '10vw',
      }}>
        <Typography variant="body1">{label}</Typography>
      </Box>

      {children}
    </Box>
  )
}

export default FormRow