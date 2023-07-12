import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/userReducer'

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
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            type="text"
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
          />
        </div>
        <div>
          password
          <input
            id="password"
            type="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
        </div>
        <button id="login-button" type="submit">
          login
        </button>
      </form>
    </div>
  )
}

export default LoginForm