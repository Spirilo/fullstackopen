import { useState } from "react"

const Blog = ({blog}) => {
  const [showInfo, setShowInfo] = useState(false)

  console.log(showInfo)

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
          <p>likes</p>
          <p>{blog.user.username}</p>
        </div>
      }
    </div>  
  )
}

export default Blog