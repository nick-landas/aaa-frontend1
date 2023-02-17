import React from 'react'
import Typography from '@mui/material/Typography'
import { makeStyles } from 'tss-react/mui'

const useStyles = makeStyles()((theme) => {
    return {
  logo: {
    fontFamily: 'Display Fair, serif',
    fontWeight: 700,
    marginRight: theme.spacing(1),
  },
}})

const Logo = () => {
    const { classes } = useStyles();
  return (
    <Typography variant="h5" className={classes.logo}>
      I Luv LA (Lower Alabama) Chat.
    </Typography>
  )
}

export default Logo