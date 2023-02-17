import React, { useEffect, useContext, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import QuillEditor from './QuillEditor'

import { List, Container } from '@mui/material'
import { makeStyles } from 'tss-react/mui';

import { selectMessagesByGroup } from './messagesSlice'
import { selectGroupIds, updateGroupLastViewed } from '../groups/groupsSlice'
import { ActionCableContext } from '../../index'
import MessageItem from './MessageItem'

const useStyles = makeStyles()((theme) => {
    return {
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100% - 60px)',
  },
  msgList: {
    flexGrow: 1,
  }
}})

const MessagesList = () => {
    const { classes } = useStyles();
  const navigate = useNavigate()

  const { groupId } = useParams()
  const groupIds = useSelector(selectGroupIds)

  const messages = useSelector((state) => selectMessagesByGroup(state, groupId))
  const currentUserId = useSelector((state) => state.users.currentUser)

  const cable = useContext(ActionCableContext)
  const [channel, setChannel] = useState(null)
  const endRef = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    return () => {
      dispatch(updateGroupLastViewed({ groupId, currentUserId }))
    }
  }, [groupId, currentUserId, dispatch])

  useEffect(() => {
    const channel = cable.subscriptions.create({
      channel: 'MessagesChannel',
      id: groupId,
    })
    setChannel(channel)
    return () => {
      channel.unsubscribe()
    }
  }, [groupId, dispatch, cable.subscriptions])

  const sendMessage = (content) => {
    const data = { groupId, userId: currentUserId, content }
    channel.send(data)
  }

  const renderedMessages =
    messages &&
    messages.map((message) => (
      <MessageItem key={message.id} message={message} />
    ))

  if (!groupIds.includes(groupId)) {
    navigate('/groups')
  }

  return (
    <Container maxWidth="md" className={classes.root}>
      <List className={classes.msgList}>{renderedMessages}</List>
      <QuillEditor sendMessage={sendMessage} groupId={groupId} />
      <div ref={endRef} />
    </Container>
  )
}

export default MessagesList