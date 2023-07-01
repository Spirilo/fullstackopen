import { useDispatch } from "react-redux"
import { addAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const add = (ev) => {
    ev.preventDefault()
    const anecdote = ev.target.anecdote.value
    ev.target.anecdote.value = ''
    dispatch(addAnecdote(anecdote))
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