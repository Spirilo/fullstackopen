import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const Anecdote = ({ anecdote, addLike }) => {
  return(
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => addLike(anecdote.id)}>vote</button>
      </div>
    </div>

  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  return(
    <div>
    {anecdotes.map(anecdote =>
      <Anecdote
        anecdote={anecdote}
        addLike={vote}
      />
    )}
    </div>
  )
}

export default AnecdoteList