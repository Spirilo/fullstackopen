import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  state: '',
  reducers: {
    filterAnecdotes(state, action) {
      state = action.payload.filter
      return state
    }
  }
})

export const { filterAnecdotes } = filterSlice.actions
export default filterSlice.reducer