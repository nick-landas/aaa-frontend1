import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import Button from '@mui/material/Button'

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0()

  return (
    <Button
      onClick={() =>
        loginWithRedirect({
          screen_hint: 'signup',
        })
      }
      size="large"
      variant="contained"
      color="primary">
      Sign Up
    </Button>
  )
}

export default SignupButton