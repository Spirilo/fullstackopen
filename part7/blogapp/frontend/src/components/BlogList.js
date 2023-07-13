import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogRef = useRef()
  const blogs = useSelector(state => state.blog)
  const dispatch = useDispatch()

  const addBlog = async (blog) => {
    blogRef.current.toggleVisibility()
    try {
      dispatch(createBlog(blog))
      dispatch(setNotification(`a new blog ${blog.title} by ${blog.author} was added!`, 5))
    } catch (error) {
      dispatch(setNotification('error adding a new blog', 5))
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div>
      <Togglable buttonLabel="new blog" ref={blogRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        </div>
        //<Blog
        //key={blog.id}
        //blog={blog}
        ///>
      ))}
    </div>
  )
}

export default BlogList