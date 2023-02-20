import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'

import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui';

import { updateGroupMember } from './groupsSlice'
import { setSnackbar } from '../../ui/snackbarSlice'
import GroupShowPage from './GroupShowPage'

const useStyles = makeStyles()((theme) => {
    return {
  groupCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
}})

const textTruncate = (str, num) => {
  if (str.length > num) {
    return str.slice(0, num) + '...'
  }
  return str
}

const GroupCard = ({ group }) => {
    const { classes } = useStyles();
  
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

  const currentUserId = useSelector((state) => state.users.currentUser)

  const dispatch = useDispatch()

  const [joinRequestStatus, setJoinRequestStatus] = useState('idle')
  const handleJoin = async () => {
    if (joinRequestStatus !== 'idle') {
      dispatch(setSnackbar(serverError))
    } else {
      try {
        setJoinRequestStatus('pending')
        const updatedMembers = group.userIds.concat(currentUserId)
        const resultAction = dispatch(
          updateGroupMember({
            id: group.id,
            data: { user_ids: updatedMembers },
          })
        )
        unwrapResult(resultAction)
        dispatch(setSnackbar(successMessage(group.name)))
      } catch (err) {
        console.error('Failed to save the group: ', err)
        setJoinRequestStatus('failed')
      } finally {
        setJoinRequestStatus('idle')
      }
    }
  }

  const truncatedName = textTruncate(group.name, 18)
  const truncatedDesc = textTruncate(group.description, 60)

  return (
    <>
      <Grid item lg={3} md={6} sm={12} xs={12}>
        <Card className={classes.groupCard}>
          <CardActionArea onClick={handleClickOpen}>
            <CardMedia
              component="img"
              alt={group.name}
              height="160px"
              image={group.image_url}
              title={group.name}
            />
            <CardContent>
              <Typography gutterBottom variant="h5">
                {truncatedName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {truncatedDesc}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            {!group.userIds.includes(currentUserId) && (
              <Button size="small" color="primary" onClick={handleJoin}>
                Join
              </Button>
            )}
            <Button size="small" color="primary" onClick={handleClickOpen}>
              Group Info
            </Button>
          </CardActions>
        </Card>
      </Grid>
      <GroupShowPage
        key={group.id}
        open={open}
        group={group}
        handleClose={handleClose}
        handleJoin={handleJoin}
      />
    </>
  )
}

// snackbar helpers
const serverError = {
  open: true,
  type: 'error',
  message: 'Server busy, try again later',
}

const successMessage = (name) => ({
  open: true,
  type: 'success',
  message: `Joined ${name} successfully`,
})

export default GroupCard