import React from 'react'

import { makeStyles } from 'tss-react/mui'
import { Grid, Typography, Button, Box } from '@mui/material'

import welcomePhoto from './iluvlachat_logo.png'
import SignupButton from '../features/users/SignupButton'

const useStyles = makeStyles()((theme) => {
    return {
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
  },
  title: {
    fontFamily: 'Amatic SC, serif',
    fontWeight: 400,
  },
  introTitle: {
    marginBottom: theme.spacing(5),
    fontFamily: 'Josefin Sans, serif',
    fontWeight: 600,
  },
  buttonContainer: {},
  introBackground: {
    background:
      'linear-gradient(90deg, rgba(239,198,54,1) 0%, rgba(243,239,169,1) 41%, rgba(243,171,58,1) 100%);',
  },
  welcomePhoto: {
    width: '48%',
    height: 'auto',
    position: 'absolute',
    top: '18vh',
    right: '10%',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
}})

const LandingPage = () => {
  const {classes} = useStyles()

  return (
    <Grid container component="main" className={classes.root} spacing={0}>
      <Grid container item xs={12} sm={6} direction="column" justify="center">
        <Box maxWidth="300px" alignSelf="center">
          <Typography variant="h1" className={classes.title}>
            I Luv LA (Lower Alabama) 
          </Typography>
          <Typography variant="h4" className={classes.introTitle}>
            We Luv It!
          </Typography>
          <Typography>
            A simple chat app that encourages people 
            with similar interests and passions to explore 
            everything that Lower Alabama aka the Redneck Riviera offers.
          </Typography>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={2}
            style={{ marginTop: '25px' }}>
            <Grid item>
              <SignupButton />
            </Grid>
            <Grid item>
              <a
                href="https://youtu.be/jx5hdo50a2M"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}>
                <Button size="large" variant="contained" color="primary">
                  Watch a Material UI tutorial
                </Button>
              </a>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6} className={classes.introBackground}>
        <img
          className={classes.welcomePhoto}
          src={welcomePhoto}
          alt="Happy people"
        />
      </Grid>
    </Grid>
  )
}

export default LandingPage