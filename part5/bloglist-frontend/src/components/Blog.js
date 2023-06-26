import { useState } from "react"

const Blog = ({blog, addLike, removeBlog}) => {
  const [showInfo, setShowInfo] = useState(false)

  console.log(showInfo)
  const userJson = window.localStorage.getItem('loggedUser')
  const user = JSON.parse(userJson)
  console.log(user)

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
    <div style={blogStyle}>
      {!showInfo &&
        <div>
          {blog.title} {blog.author} <button onClick={() => setShowInfo(!showInfo)}>view</button>
        </div>
      }
      {showInfo && 
        <div>
          {blog.title} {blog.author} <button onClick={() => setShowInfo(!showInfo)}>hide</button>
          <p>{blog.url}</p>
          <p>likes {blog.likes} <button onClick={like}>like</button></p>
          <p>{blog.user.username}</p>
          {blog.user.username === user.username &&
          <button onClick={remove}>remove</button>
          }
        </div>
      }
    </div>  
  )
}

export default Blog