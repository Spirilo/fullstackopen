const filterReducer = (state = '', action) => {
  switch(action.type) {
    case 'FILTER':
      state = action.payload.filter
      return state
    default: return state
  }
}

export const filterAnecdotes = (filter) => {
  return {
    type: 'FILTER',
    payload: { filter }
  }
}

export default filterReducer