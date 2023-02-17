import React, { useState } from 'react'

import { makeStyles } from 'tss-react/mui';
import { Backdrop, CircularProgress } from '@mui/material'

const useStyles = makeStyles()((theme) => {
    return {
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}})

const LoadingBkgrnd = () => {
  const {classes} = useStyles()
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Backdrop className={classes.backdrop} open={open} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

export default LoadingBkgrnd