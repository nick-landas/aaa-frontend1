import React from 'react';
// import { useTheme } from '@mui/material/styles';
import { makeStyles } from 'tss-react/mui';
import { Box, Drawer, Typography, Link, Toolbar } from '@mui/material';

import GroupsList from '../features/groups/GroupsList';

export const drawerWidth = 300;

const useStyles = makeStyles()((theme) => {
  return {
    drawer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    footer: {
      [theme.breakpoints.up('sm')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      position: 'fixed',
      left: 0,
      bottom: 0,
    },
  };
});

const SideNav = ({ handleDrawerToggle, container, mobileOpen }) => {
  const { classes } = useStyles();
  // const { theme } = useTheme();
  

  const footer = (
    <Toolbar className={classes.footer}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link
          color="inherit"
          target="_blank"
          rel="noopener"
          href="https://dev.to/nick_nick"
        >
          Nick Landas
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    </Toolbar>
  );

  const drawerContent = (
    <div className={classes.toolbar}>
      <GroupsList />
      <br></br>      
      {footer}
    </div>
  );



  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="groups and messages folders"
    >
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default SideNav;
