import React from 'react'
import { useSelector } from 'react-redux'

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  CardMedia,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  ListSubheader,
  Button,
} from '@mui/material'
import { makeStyles } from 'tss-react/mui';

import { selectUsersByGroup } from '../users/usersSlice'

const useStyles = makeStyles()((theme) => {
    return {
        ImageList: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        },
        ImageListItem: {},
    }})

const GroupShowPage = ({ open, handleClose, group, handleJoin }) => {
    const { classes } = useStyles();
    const members = useSelector((state) => selectUsersByGroup(state, group.id))
    const currentUserId = useSelector((state) => state.users.currentUser)

  const renderedMembers =
    members &&
    members.map((member) => (
      <ImageListItem key={member.id}>
        <img src={member.image_url} alt={member.name} />
        <ImageListItemBar title={member.name} />
      </ImageListItem>
    ))

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{group.name}</DialogTitle>
      <CardMedia
        component="img"
        alt={group.name}
        height="250px"
        image={group.image_url}
        title={group.name}
      />
      <DialogContent>
        <Typography gutterBottom variant="body1">
          {group.description}
        </Typography>
        <div className={classes.ImageList}>
          <ImageList>
            <ImageListItem key="Subheader" cols={2} style={{ height: 'auto' }}>
              <ListSubheader component="div">
                {members.length} members
              </ListSubheader>
            </ImageListItem>
            {renderedMembers}
          </ImageList>
        </div>
      </DialogContent>
      <DialogActions
        style={{ paddingRight: '1.5rem', paddingBottom: '1.5rem' }}>
        <Button onClick={handleClose}>close</Button>
        {!group.userIds.includes(currentUserId) && (
          <Button variant="contained" color="primary" onClick={handleJoin}>
            Join
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default GroupShowPage