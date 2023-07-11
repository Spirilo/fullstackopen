import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogRef = useRef()
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blog)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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

    const credentials = { username, password }
    console.log(credentials)
    try {
      const user = await loginService.login(credentials)
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      dispatch(setNotification('bad credentials', 5))
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async (blog) => {
    blogRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blog))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} was added!`, 5))
    } catch (error) {
      dispatch(setNotification('error adding a new blog', 5))
    }
  }

  return (
    <div>
      {!user && (
        <>
          <Notification />
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
        </>
      )}
      {user && (
        <>
          <h4>
            logged in as {user.username}{' '}
            <button onClick={handleLogout}>logout</button>{' '}
          </h4>
          <Notification />
          <Togglable buttonLabel="new blog" ref={blogRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <BlogList />
        </>
      )}
    </div>
  )
}

export default App
