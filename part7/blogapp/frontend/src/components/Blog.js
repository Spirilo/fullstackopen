import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, updateBlog } from '../reducers/blogReducer'
import { useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blog.find(blog => blog.id === id))
  console.log(blog)

  const like = () => {
    dispatch(updateBlog(blog))
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      dispatch(deleteBlog(blog.id))
  }

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={like}>like</button></p>
      <p>added by {blog.user.name}</p>
    </div>
  )
}

export default Blog
