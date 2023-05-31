import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (ev) => {
    ev.preventDefault()

    const credentials = {username, password}
    console.log(credentials)
    try {
      const user = await loginService.login(credentials)
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

  return (
    <div>
      {!user &&
      <>
      <h2>log in to application</h2>
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
        <h4>logged in as {user.username}</h4>
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