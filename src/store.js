import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './features/users/usersSlice'
import groupsReducer from './features/groups/groupsSlice'
import messagesReducer from './features/messages/messagesSlice'
import snackbarReducer from './ui/snackbarSlice'

export default configureStore({
  reducer: {
    users: usersReducer,
    groups: groupsReducer,
    messages: messagesReducer,
    snackbar: snackbarReducer,
  },
})