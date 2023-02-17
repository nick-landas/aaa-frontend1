import React from 'react'

import { AppBar, Toolbar } from '@mui/material'

import Logo from '../ui/Logo'
import LoginButton from '../features/users/LoginButton'

const UnauthNavBar = () => (
  <AppBar position="fixed" elevation={0} color="transparent">
    <Toolbar style={{ justifyContent: 'space-between' }}>
      <Logo />
      <LoginButton />
    </Toolbar>
  </AppBar>
)

export default UnauthNavBar