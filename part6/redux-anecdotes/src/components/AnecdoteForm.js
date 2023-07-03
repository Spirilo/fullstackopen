import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = async (ev) => {
    ev.preventDefault()
    const anecdote = ev.target.anecdote.value
    ev.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
    dispatch(setNotification(`You added a new anecdote '${anecdote}'`, 5))
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