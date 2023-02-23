import {
    createSlice,
    createAsyncThunk,
    createSelector,
    createEntityAdapter,
  } from '@reduxjs/toolkit'
  import { formatISO } from 'date-fns/esm'
  
  import iluvlachat from '../../api/iluvlachat'
  
  const groupsAdapter = createEntityAdapter()
  
  const initialState = groupsAdapter.getInitialState({
    status: 'idle',
    error: null,
  })
  
  export const fetchUserGroups = createAsyncThunk(
    'groups/fetchUserGroups',
    async (currentUserId) => {
      const response = await iluvlachat.get(`/users/${currentUserId}/memberships`)
      return response.data.data.map((membership) => {
        const lastViewed = membership.attributes.last_viewed
        const groupId = membership.relationships.group.data.id
        const group = response.data.included.find((group) => group.id === groupId)
        const userIds = group.relationships.users.data.map((user) => user.id)
        return { id: groupId, ...group.attributes, lastViewed, userIds }
      })
    }
  )
  
  export const fetchGroups = createAsyncThunk(
    'groups/fetchGroups',
    async (currentUserId) => {
      const response = await iluvlachat.get('/groups')
      return response.data.data.reduce((result, group) => {
        const userIds = group.relationships.users.data.map((user) => user.id)
        if (!userIds.includes(currentUserId)) {
          result.push({
            id: group.id,
            ...group.attributes,
            userIds,
          })
        }
        return result
      }, [])
    }
  )
  
  export const addNewGroup = createAsyncThunk('groups/addNewGroup', async (data) => {
    const response = await iluvlachat.post('/groups', { group: data })
    const groupData = response.data.data
    const userIds = groupData.relationships.users.data.map((user) => user.id)
    return { id: groupData.id, ...groupData.attributes, userIds }
  })
  
  export const updateGroupMember = createAsyncThunk(
    'groups/updateGroupMember',
    async ({ id, data }) => {
      const response = await iluvlachat.patch(`/groups/${id}`, { group: data })
      const groupData = response.data.data
      const userIds = groupData.relationships.users.data.map((user) => user.id)
      return { id: groupData.id, ...groupData.attributes, userIds }
    }
  )
  
  export const updateGroupLastViewed = createAsyncThunk(
    'groups/updateGroupLastViewed',
    async ({ groupId, currentUserId }) => {
      const last_viewed = formatISO(Date.now())
      const response = await iluvlachat.patch(`/users/${currentUserId}`, {
        group_id: groupId,
        last_viewed,
      })
      const lastViewed = response.data.data.attributes.last_viewed
      return { id: groupId, lastViewed }
    }
  )
  
  const groupsSlice = createSlice({
    name: 'groups',
    initialState,
    reducers: {},
    extraReducers: {
      [fetchUserGroups.pending]: (state, action) => {
        state.status = 'loading'
      },
      [fetchUserGroups.fulfilled]: (state, action) => {
        state.status = 'succeeded'
        groupsAdapter.setAll(state, action.payload)
      },
      [fetchUserGroups.rejected]: (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      },
      [fetchGroups.fulfilled]: groupsAdapter.upsertMany,
      [addNewGroup.fulfilled]: groupsAdapter.addOne,
      [updateGroupMember.fulfilled]: groupsAdapter.upsertOne,
      [updateGroupLastViewed.fulfilled]: (state, action) => {
        const { id, ...changes } = action.payload
        groupsAdapter.updateOne(state, { id, changes })
      },
    },
  })
  
  export default groupsSlice.reducer
  
  export const {
    selectIds: selectGroupIds,
    selectAll: selectAllGroups,
    selectById: selectGroupById,
  } = groupsAdapter.getSelectors((state) => state.groups)
  
  export const selectGroupsByUser = createSelector(
    [selectAllGroups, (state, userId) => userId],
    (groups, userId) => groups.filter((group) => group.userIds.includes(userId))
  )