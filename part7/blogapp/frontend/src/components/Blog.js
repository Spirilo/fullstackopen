import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, deleteBlog, updateBlog } from '../reducers/blogReducer'
import { useNavigate, useParams } from 'react-router-dom'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => state.blog.find(blog => blog.id === id))
  const user = useSelector(state => state.user)
  const [comment, setComment] = useState('')
  const navigate = useNavigate()

  const like = () => {
    dispatch(updateBlog(blog))
  }

  const addComment = () => {
    const object = {
      comment: comment
    }
    dispatch(commentBlog(blog.id, object))
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`))
      dispatch(deleteBlog(blog.id))
    navigate(-1)
  }

  if(!blog) return null

  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>{blog.likes} likes <button onClick={like}>like</button></p>
      <p>added by {blog.user.name}</p>
      <h4>comments</h4>
      <form onSubmit={addComment}>
        <input
          value={comment}
          onChange={ev => setComment(ev.target.value)}
        />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map(c => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {user.username === blog.user.username
        ? <button onClick={remove}>remove</button>
        : ''
      }
    </div>
  )
}

export default Blog
