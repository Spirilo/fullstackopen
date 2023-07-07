import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, user }) => {
  const [showInfo, setShowInfo] = useState(false)

  console.log(user)
  const toggle = () => {
    setShowInfo(!showInfo)
  }

  const like = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes += 1
    }
    addLike(blog.id, updatedBlog)
  }

  const remove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) removeBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle} className='blog'>
      {!showInfo &&
        <div>
          {blog.title} {blog.author} <button onClick={toggle}>view</button>
        </div>
      }
      {showInfo &&
        <div className='blog-all'>
          {blog.title} {blog.author} <button onClick={toggle}>hide</button>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={like}>like</button></p>
          <p>{blog.user.username}</p>
          {blog.user.username === user ?
            <button onClick={remove}>remove</button>
            : ''}
        </div>
      }
    </div>
  )
}

export default Blog