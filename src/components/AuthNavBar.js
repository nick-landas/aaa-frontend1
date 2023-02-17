import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

import { makeStyles } from 'tss-react/mui';
import {
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import SearchBar from './SearchBar';
import Logo from '../ui/Logo';
import AddGroupForm from '../features/groups/AddGroupForm';
import { drawerWidth } from './SideNav';

const useStyles = makeStyles()((theme) => {
  return {
    appBar: {
      [theme.breakpoints.up('sm')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      background:
        'linear-gradient(linear-gradient(90deg, rgba(236,69,109,1) 0%, rgba(236,166,42,1) 80%, rgba(255,0,46,1) 100%);',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('sm')]: {
        display: 'none',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    grow: {
      flexGrow: 1,
    },
  };
});

const AuthNavBar = ({ handleDrawerToggle }) => {
  const { classes } = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const { user, logout } = useAuth0();

  const handleNewGroupClick = () => {
    setAnchorEl(null);
    setOpen(true);
  };

  const handleLogOutClick = () => {
    setAnchorEl(null);
    logout({ returnTo: window.location.origin });
  };

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            aria-label="menu"
            onClick={handleDrawerToggle}
          >
            <MenuIcon />
          </IconButton>
          <Logo />
          <SearchBar />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              color="inherit"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              <Avatar alt={user.name} src={user.picture} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
            >
              <MenuItem onClick={handleNewGroupClick}>New Group</MenuItem>
              <MenuItem
                component={Link}
                to={'/groups'}
                onClick={() => setAnchorEl(null)}
              >
                Groups
              </MenuItem>
              <MenuItem onClick={handleLogOutClick}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <AddGroupForm open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default AuthNavBar;
