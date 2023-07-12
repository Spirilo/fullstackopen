import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import blogService from './services/blogs'

import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogList from './components/BlogList'

import { setNotification } from './reducers/notificationReducer'
import { createBlog, initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import LoginForm from './components/LoginForm'

const App = () => {
  const blogRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogout = () => {
    dispatch(setUser(null))
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
          <LoginForm />
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
