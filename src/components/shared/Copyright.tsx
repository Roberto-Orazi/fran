import { Link, Typography } from '@mui/material'
import React from 'react'

const Copyright = React.memo(() => (
  <Typography variant="body2" color="textSecondary" align="center">
    {'Copyright © '}
    <Link color="inherit" href="https://www.skillfuldev.com" target='_blank'>
      Decoupling NFT
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
))

export default Copyright
