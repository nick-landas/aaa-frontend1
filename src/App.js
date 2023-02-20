import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { useAuth0 } from '@auth0/auth0-react';
import { makeStyles } from 'tss-react/mui';

import {
  selectAllUsers,
  currentUserAdded,
  addNewUser,
} from './features/users/usersSlice';
import { fetchUserGroups } from './features/groups/groupsSlice';
import { fetchUserAllMessages } from './features/messages/messagesSlice';

import UnauthNavBar from './components/UnauthNavBar';
import AuthNavBar from './components/AuthNavBar.js';
import SideNav from './components/SideNav';
import LandingPage from './components/LandingPage';
import LoadingBkgrnd from './components/LoadingBkgrnd';
import GroupsGrid from './features/groups/GroupsGrid';
import { AuthenticatedRoute } from './AuthenticatedRoute';
import GlobalSnackbar from './ui/GlobalSnackbar';
import MessagesList from './features/messages/MessagesList';
import Dashboard from './components/Dashboard';

const useStyles = makeStyles()((theme) => {
  return {
    toolbar: theme.mixins.toolbar,
    content: {
      height: '100vh',
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  };
});

const App = (props) => {
  // helpers for material UI styles
  const { classes } = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const { window } = props;
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // initial loading (auth, user groups, user messages)
  const { isLoading, isAuthenticated, user } = useAuth0();

  const users = useSelector(selectAllUsers);
  const groupsStatus = useSelector((state) => state.groups.status);
  const messagesStatus = useSelector((state) => state.messages.status);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated) return;
    const { email, name, picture } = user;
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      dispatch(currentUserAdded(existingUser.id));

      const fetchGroupsForUser = async () => {
        await dispatch(fetchUserGroups(existingUser.id));
      };

      const fetchMessagesForUser = async () => {
        await dispatch(fetchUserAllMessages(existingUser.id));
      };

      fetchGroupsForUser();
      fetchMessagesForUser();
    } else {
      const addCurrentUser = async () => {
        const resultAction = dispatch(
          addNewUser({ email, name, image_url: picture })
        );
        const newUser = unwrapResult(resultAction);
        dispatch(currentUserAdded(newUser.id));
      };

      addCurrentUser();
    }
  }, [isAuthenticated, dispatch, user, users]);

  if (isLoading || groupsStatus === 'loading' || messagesStatus === 'loading') {
    return <LoadingBkgrnd />;
  }

  return (
    <>
      <GlobalSnackbar />
      <div style={{ display: 'flex' }}>
        {isAuthenticated ? (
          <AuthNavBar handleDrawerToggle={handleDrawerToggle} />
        ) : (
          <UnauthNavBar />
        )}
        {isAuthenticated && (
          <SideNav
            handleDrawerToggle={handleDrawerToggle}
            container={container}
            open={mobileOpen}
          />
        )}
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route
              path="/dashboard"
              element={<AuthenticatedRoute component={Dashboard} />}
            />
            <Route
              path="/groups"
              element={<AuthenticatedRoute component={GroupsGrid} />}
            />
            <Route
              path="/groups/:groupId"
              element={<AuthenticatedRoute children={MessagesList} />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

export default App;
