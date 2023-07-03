import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
  const queryClient = useQueryClient()

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
    
  }

  const result = useQuery('anecdotes', getAnecdotes, {retry: 1})

  const anecdotes = result.data

  if(result.isError) {
    return <p>anecdote server not available due to problems in server</p>
  }

  if(result.isLoading) {
    return <div>Loading data...</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
