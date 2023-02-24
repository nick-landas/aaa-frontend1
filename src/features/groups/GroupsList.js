import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { List, ListSubheader, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import { selectGroupsByUser } from './groupsSlice'
import GroupShowPage from './GroupShowPage'
import GroupsListMenu from './GroupsListMenu'
import GroupListItem from './GroupListItem'

const GroupsList = () => {
  // Material UI styling helpers
  const [open, setOpen] = useState(false)
  const handleClose = () => setOpen(false)
  const [anchorEl, setAnchorEl] = useState(null)
  // Material UI styling helpers

  const currentUserId = useSelector((state) => state.users.currentUser)
  const groups = useSelector((state) => selectGroupsByUser(state, currentUserId))
  const [clickedGroup, setClickedGroup] = useState(null)
  const handleMoreIconClick = (e, group) => {
    setAnchorEl(e.currentTarget)
    setClickedGroup(group)
  }

  const renderedGroupListItems = groups.map((group) => (
    <GroupListItem
      key={group.id}
      group={group}
      handleMoreIconClick={(e) => handleMoreIconClick(e, group)}
    />
  ))

  return (
    <List
      component="nav"
      subheader={
        <ListSubheader component="div" id="list-subheader">
          Groups
        </ListSubheader>
      }>
      <Button
        component={Link}
        to={'/groups'}
        color="primary"
        style={{ marginLeft: '2rem' }}
        startIcon={<AddIcon />}>
        Join group/Create group
      </Button>
      {renderedGroupListItems}
      <GroupsListMenu
        clickedgroup={clickedGroup}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        setOpen={setOpen}
      />
      {clickedGroup && (
        <GroupShowPage
          open={open}
          handleClose={handleClose}
          group={clickedGroup}
        />
      )}
    </List>
  )
}

export default GroupsList