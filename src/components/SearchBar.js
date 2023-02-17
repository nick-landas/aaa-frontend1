import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { makeStyles } from 'tss-react/mui'
import { InputBase } from '@mui/material'
import NoSsr from '@mui/base/NoSsr';
import Autocomplete from '@mui/material/Autocomplete'
import SearchIcon from '@mui/icons-material/Search'

import { selectGroupsByUser } from '../features/groups/groupsSlice'

const useStyles = makeStyles()((theme) => {
    return {
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: `rgba{$theme.palette.common.white} / 0.15)`,
    '&:hover': {
      backgroundColor: `rgba{theme.palette.common.white} / 0.25)`,
    },
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}})

const SearchBar = () => {
    const { classes } = useStyles();
    const navigate = useNavigate()
    const [value, setValue] = useState(null)

    const currentUserId = useSelector((state) => state.users.currentUser)
    const userGroups = useSelector((state) =>
        selectGroupsByUser(state, currentUserId)
    )

  // search for messages
  // add another property - allgroups boolean
  const handleChange = (e, newValue) => {
    navigate(`/groups/${newValue.id}`)
    setValue(newValue)
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <NoSsr>
      <Autocomplete
        value={value}
        onChange={(e, newValue) => {
          handleChange(e, newValue)
        }}
        options={userGroups}
        getOptionLabel={(option) => option.name}
        style={{ width: 300 }}
        renderInput={(params) => (
          <div ref={params.InputProps.ref}>
            <InputBase
              {...params.inputProps}
              placeholder="Search for your groups..."
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
            
          </div>
        )}
      />
      </NoSsr>
    </div>
  )
}

export default SearchBar