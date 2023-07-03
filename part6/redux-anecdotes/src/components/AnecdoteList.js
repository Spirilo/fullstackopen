import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, addLike }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => addLike(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>

  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state =>
     state.anecdotes
     .filter(s => 
       s.content.toLowerCase().includes(state.filter.toLowerCase())
     ))

  const dispatch = useDispatch()

  const vote = (id, content) => {
    console.log('vote', id)
    dispatch(addVote(id))
    dispatch(setNotification(`You voted for anecdote '${content}'`))
    setTimeout(() => {
      dispatch(setNotification(null))
    }, 5000);
  }

  return(
    <div>
    {anecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        addLike={vote}
      />
    )}
    </div>
  )
}

export default AnecdoteList