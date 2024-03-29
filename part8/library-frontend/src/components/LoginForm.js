import { useMutation } from "@apollo/client"
import { LOGIN } from "../queries"

import { useState, useEffect } from 'react'

const LoginForm = ({ show , setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN)

  useEffect(() => {
    if(result.data) {
      console.log(result.data)
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)        
    }
  }, [result.data])

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    login({ variables: { username, password } })
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          username
          <input 
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input 
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />  
        </div>
        <div>
          <button type="submit">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm