import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'
import { TextField, Typography, Button } from '@mui/material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (ev) => {
    ev.preventDefault()
    const credentials = { username, password }
    dispatch(loginUser(credentials))
  }

  return(
    <div>
      <Typography variant='h4'>Log in to app</Typography>
      <form onSubmit={handleLogin}>
        <div>
          <TextField
            value={username}
            label='username'
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>
        <div>
          <TextField
            type='password'
            value={password}
            label='password'
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <Button type='submit' variant='contained'>Login</Button>
      </form>
    </div>
  )
}

export default LoginForm