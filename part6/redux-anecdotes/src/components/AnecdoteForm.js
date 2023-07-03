import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (ev) => {
    ev.preventDefault()
    const anecdote = ev.target.anecdote.value
    ev.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch(addAnecdote(newAnecdote))
    dispatch(setNotification(`You added a new anecdote '${anecdote}'`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000);
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={add}>
          <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm