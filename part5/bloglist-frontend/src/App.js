import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (ev) => {
    ev.preventDefault()

    const credentials = {username, password}
    console.log(credentials)
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMsg('bad credentials')
      setTimeout(() => {
        setErrorMsg(null)
      }, 5000)  
    }
  }
  
  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()

  }

  const changeError = msg => {
    console.log(msg)
  }

  return (
    <div>
      {!user &&
      <>
      <Notification message={errorMsg} color='red' />
      <h2>log in to application</h2>
      <p>{errorMsg}</p>
      <form onSubmit={handleLogin}>
        <div>
        username
        <input type="text" value={username} onChange={ev => setUsername(ev.target.value)} />
        </div>
        <div>
        password
        <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} />
        </div>
        <button type="submit">login</button> 
      </form>
    </>
    }
      {user && 
        <>
        <h4>logged in as {user.username} <button onClick={handleLogout}>logout</button> </h4>
        <AddBlog onChange={changeError} />
        <Notification message={errorMsg} color='green' />
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        
        )}
        </>
      }
    </div>
  )
}

export default App