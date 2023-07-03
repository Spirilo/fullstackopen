import { useDispatch, useSelector } from "react-redux"
import { updateAnecdote } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"

const Anecdote = ({ anecdote, addLike }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => addLike(anecdote)}>vote</button>
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

  const vote = (anecdote) => {
    console.log('vote', anecdote)
    dispatch(updateAnecdote(anecdote))
    dispatch(setNotification(`You voted for anecdote '${anecdote.content}'`, 5))
    
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