import { createSlice } from "@reduxjs/toolkit"

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      state = notification
      return state
    }
  }
})

export const { setNotification} = notificationSlice.actions
export default notificationSlice.reducer