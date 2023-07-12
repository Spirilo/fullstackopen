import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state = action.payload
      return state
    }
  }
})

export const { setUser } = userSlice.actions

export const loginUser = credentials => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (error) {
      dispatch(setNotification('bad credentials', 5))
    }
  }
}

export default userSlice.reducer