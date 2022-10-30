import React from 'react'
import { Box, H1 } from '@adminjs/design-system'

const Dashboard = () => {
  return (
    <Box
      flex
      style={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <H1>NestBE</H1>
    </Box>
  )
}

export default Dashboard
