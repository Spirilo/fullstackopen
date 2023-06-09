import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState(null)

  const blogRef = useRef()
  console.log(user)

  useEffect(() => {
    const getData = async () => {
      const data = await blogService.getAll()
      const sorted = data.sort((a,b) => b.likes - a.likes)
      setBlogs(sorted)
    }
    getData()
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
      setMsg('bad credentials')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const addBlog = async blog => {
    blogRef.current.toggleVisibility()
    try {
      const added = await blogService.create(blog)
      setBlogs(await blogService.getAll())
      setMsg(`a new blog ${added.title} by ${added.author} was added!`)
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    } catch (error) {
      setMsg('error adding a new blog')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }

  const addLike = async (id, blog) => {
    const res = await blogService.save(id, blog)
    setBlogs(blogs
      .map(blog => blog !== res ? blog : res)
      .sort((a,b) => b.likes - a.likes)
    )
  }

  const removeBlog = async id => {
    await blogService.dlt(id)
    setBlogs(blogs.filter(blog => blog.id !== id))
  }

  return (
    <div>
      {!user &&
      <>
        <Notification message={msg} />
        <h2>log in to application</h2>
        <p>{msg}</p>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              id='username'
              type="text"
              value={username}
              onChange={ev => setUsername(ev.target.value)} />
          </div>
          <div>
            password
            <input
              id='password'
              type="password"
              value={password}
              onChange={ev => setPassword(ev.target.value)} />
          </div>
          <button id='login-button' type="submit">login</button>
        </form>
      </>
      }
      {user &&
      <>
        <h4>logged in as {user.username} <button onClick={handleLogout}>logout</button> </h4>
        <Notification message={msg} />
        <Togglable buttonLabel='new blog' ref={blogRef}>
          <BlogForm
            createBlog={addBlog}
          />
        </Togglable>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            removeBlog={removeBlog}
            user={user.username}
          />
        )}
      </>
      }
    </div>
  )
}

export default App