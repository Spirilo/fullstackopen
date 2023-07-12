import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [showInfo, setShowInfo] = useState(false)
  const dispatch = useDispatch()

  const user = useSelector(state => state.user)

  const toggle = () => {
    setShowInfo(!showInfo)
  }

  const like = () => {
    dispatch(updateBlog(blog))
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      dispatch(deleteBlog(blog.id))
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blog">
      {!showInfo && (
        <div>
          {blog.title} {blog.author} <button onClick={toggle}>view</button>
        </div>
      )}
      {showInfo && (
        <div className="blog-all">
          {blog.title} {blog.author} <button onClick={toggle}>hide</button>
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={like}>like</button>
          </p>
          <p>{blog.user.username}</p>
          {blog.user.username === user.username ? (
            <button onClick={remove}>remove</button>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
