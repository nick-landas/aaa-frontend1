import {
    createSlice,
    createEntityAdapter,
    createAsyncThunk,
    createSelector,
  } from '@reduxjs/toolkit'
  import { isAfter, parseISO, subYears } from 'date-fns'
  
  import iluvlachat from '../../api/iluvlachat'
  import { selectGroupById } from '../groups/groupsSlice'
  
  const messagesAdapter = createEntityAdapter()
  
  const initialState = messagesAdapter.getInitialState({
    status: 'idle',
    error: null,
  })
  
  export const fetchUserAllMessages = createAsyncThunk(
    'messages/fetchUserAllMessages',
    async (currentUserId) => {
      const response = await iluvlachat.get(`/users/${currentUserId}/messages`)
      return response.data.data.map((message) => {
        const groupId = message.relationships.group.data.id
        const userId = message.relationships.user.data.id
        return {
          id: message.id,
          ...message.attributes,
          groupId,
          userId,
        }
      })
    }
  )
  
  const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
      messageReceived(state, action) {
        const data = action.payload.data
        const message = {
          id: data.id,
          ...data.attributes,
          groupId: data.relationships.group.data.id,
          userId: data.relationships.user.data.id,
        }
        messagesAdapter.addOne(state, message)
      },
    },
    extraReducers: {
      [fetchUserAllMessages.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchUserAllMessages.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        messagesAdapter.setAll(state, action.payload)
      },
      [fetchUserAllMessages.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      },
    },
  })
  
  export const { messageReceived } = messagesSlice.actions
  
  export default messagesSlice.reducer
  
  export const { selectAll: selectAllMessages } = messagesAdapter.getSelectors(
    (state) => state.messages
  )
  
  export const selectMessagesByGroup = createSelector(
    [selectAllMessages, (state, groupId) => groupId],
    (messages, groupId) => messages.filter((message) => message.groupId === groupId)
  )
  
  export const selectUnreadMessages = createSelector(
    [selectMessagesByGroup, selectGroupById],
    (messages, group) => {
      const lastViewed = parseISO(group.lastViewed) || subYears(Date.now(), 1)
      return messages.filter((message) =>
        isAfter(parseISO(message.created_at), lastViewed)
      )
    }
  )