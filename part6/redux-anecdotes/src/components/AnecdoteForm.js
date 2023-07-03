import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (ev) => {
    ev.preventDefault()
    const anecdote = ev.target.anecdote.value
    ev.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
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