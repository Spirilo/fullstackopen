import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { useRef } from 'react'
import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableRow, TableCell, TableContainer } from '@mui/material'

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
      <h1>Blogs</h1>
      <Togglable buttonLabel="new blog" ref={blogRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <TableContainer>
        <Table padding='normal'>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id} selected='true'>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogList