import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Grid, Fab, Tooltip } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { makeStyles } from 'tss-react/mui';

import { selectAllGroups, fetchGroups } from './groupsSlice'
import GroupCard from './GroupCard'
import AddGroupForm from './AddGroupForm'

const useStyles = makeStyles()((theme) => {
    return {
  root: {
    height: '100%',
  },
  addFab: {
    position: 'sticky',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    textAlign: 'right',
  },
}})

const GroupsGrid = () => {
  // Material UI helpers
  const { classes } = useStyles();
  const [open, setOpen] = useState(false)
  const handleClickOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const groups = useSelector(selectAllGroups)
  const currentUserId = useSelector((state) => state.users.currentUser)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGroups(currentUserId))
  }, [currentUserId, dispatch])

  const renderedGroupCards = groups.map((group) => (
    <GroupCard group={group} key={group.id} />
  ))

  return (
    <div className={classes.root}>
      <Grid container spacing={2} alignItems="stretch">
        {renderedGroupCards}
      </Grid>
      <div className={classes.addFab}>
        <Tooltip title="Create a group">
          <Fab color="primary" onClick={handleClickOpen}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </div>
      <AddGroupForm open={open} handleClose={handleClose} />
    </div>
  )
}

export default GroupsGrid