import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import blogService from './services/blogs'

import { initializeBlogs } from './reducers/blogReducer'
import { setUser } from './reducers/userReducer'
import { initilizeUsers } from './reducers/usersReducer'

import Notification from './components/Notification'
import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Header from './components/Header'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initilizeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Notification />
      {!user && (
        <>
          <LoginForm />
        </>
      )}
      {user && (
        <>
          <Menu />
          <Header />
          <Routes>
            <Route path='/' element={<BlogList />} />
            <Route path='/users' element={<Users />} />
            <Route path='/users/:id' element={<User />} />
            <Route path='/blogs/:id' element={<Blog />} />
          </Routes>
        </>
      )}
    </div>
  )
}

export default App
