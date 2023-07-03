import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const votedAnecdote = action.payload
      const id = votedAnecdote.id
      return state
        .map(a => a.id !== id ? a : votedAnecdote)
        .sort((a,b) => b.votes - a.votes)
    },
    setAnecdotes(state, action) {
      return action.payload
        .sort((a,b) => b.votes - a.votes)
    }
  }
})

export const { addAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const updateAnecdote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const updated = await anecdoteService.update(anecdote.id, updatedAnecdote)
    dispatch(addVote(updated))
  }
}

export default anecdoteSlice.reducer