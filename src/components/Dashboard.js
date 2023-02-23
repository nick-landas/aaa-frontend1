import React, { useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { format } from 'date-fns'

import { Container, Typography, Paper } from '@mui/material'
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => {
    return {
  root: {
    height: 'calc(100% - 60px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}})

const Dashboard = () => {
  const {classes} = useStyles()
  const { user } = useAuth0()
  const firstName = user.name.split(' ')[0]
  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(Date.now())
    }, 1000)
    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <Container maxWidth="md" className={classes.root}>
      <Paper style={{backgroundColor:'#1fa9c2'}}>
      <Typography variant="h2" gutterBottom color="textPrimary">
        Hey, {firstName}!
      </Typography>
      <Typography variant="h4" color="textSecondary">
        Today is {format(time, 'PPPPpp')}
      </Typography>
      </Paper>
    </Container>
  )
}

export default Dashboard