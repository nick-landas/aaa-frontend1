import React, { useEffect, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import {
//   ListItem,
  ListItemText,
  ListItemButton,
  Avatar,
  ListItemSecondaryAction,
  IconButton,
  Typography,
  Box,
  Badge,
} from '@mui/material'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { ActionCableContext } from '../../index'
import {
  selectUnreadMessages,
  messageReceived,
} from '../messages/messagesSlice'

const GroupListItem = ({ group, handleMoreIconClick }) => {
  const location = useLocation()
  const dispatch = useDispatch()
  const cable = useContext(ActionCableContext)

  const numOfUnreads = useSelector((state) =>
    selectUnreadMessages(state, group.id)
  ).length

  useEffect(() => {
    cable.subscriptions.create(
      { channel: 'MessagesChannel', id: group.id },
      {
        received: (data) => {
          dispatch(messageReceived(JSON.parse(data)))
        },
      }
    )
  }, [group, cable.subscriptions, dispatch])

  const getFontWeight = () => {
    if (location.pathname.slice(7) === group.id) {
      return 'fontWeightRegular'
    }
    return numOfUnreads === 0 ? 'fontWeightRegular' : 'fontWeightBold'
  }

  const renderedNumOfUnreads = () => {
    if (location.pathname.slice(7) === group.id) {
      return 0
    }
    return numOfUnreads
  }

  return (
    <ListItemButton
      component={Link}
      to={`/groups/${group.id}`}
      selected={location.pathname.slice(7) === group.id}>
      <Badge badgeContent={renderedNumOfUnreads()} color="primary">
        <Avatar
          variant="rounded"
          src={group.image_url}
          alt={group.name}
          style={{ marginRight: '1rem' }}
        />
      </Badge>
      <ListItemText
        primary={
          <Typography>
            <Box fontWeight={getFontWeight()}>{group.name}</Box>
          </Typography>
        }
      />
      <ListItemSecondaryAction>
        <IconButton onClick={handleMoreIconClick} edge="end">
          <MoreHorizIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItemButton>
  )
}

export default GroupListItem