import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useNavigate } from 'react-router-dom'

import { Menu, MenuItem } from '@mui/material'

import { updateGroupMember } from './groupsSlice'
import { setSnackbar } from '../../ui/snackbarSlice'

const GroupsListMenu = (props) => {
  const { clickedGroup, anchorEl, setAnchorEl, setOpen } = props
  console.log('clickedGroup:', clickedGroup);
  const currentUserId = useSelector((state) => state.users.currentUser)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [leaveRequestStatus, setLeaveRequestStatus] = useState('idle')
  const handleLeaveClick = async () => {
    if (leaveRequestStatus !== 'idle') {
      dispatch(setSnackbar(serverError))
    } else {
      try {
        setLeaveRequestStatus('pending')
        const updatedMembers = clickedGroup.userIds.filter(
          (id) => id !== currentUserId
          )
        const resultAction = dispatch(
            updateGroupMember({
                id: clickedGroup.id,
                data: { user_ids: updatedMembers },
            })
            )
        unwrapResult(resultAction)
        navigate('/groups')
        dispatch(setSnackbar(successMessage(clickedGroup.name)))
      } catch (err) {
        console.error('Failed to save the group: ', err)
        setLeaveRequestStatus('failed')
      } finally {
        setLeaveRequestStatus('idle')
      }
    }
  }

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}>
      <MenuItem
        onClick={() => {
          setAnchorEl(null)
          setOpen(true)
        }}>
        Group Info
      </MenuItem>
      <MenuItem
        onClick={() => {
          setAnchorEl(null)
          handleLeaveClick()
        }}>
        Leave Group
      </MenuItem>
    </Menu>
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
  message: `You left the ${name} group `,
})

export default GroupsListMenu