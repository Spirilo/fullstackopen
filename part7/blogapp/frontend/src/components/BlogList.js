import { useSelector } from 'react-redux'
import Blog from './Blog'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          //addLike={addLike}
          //removeBlog={removeBlog}
          //user={user.username}
        />
      ))}
    </div>
  )
}

export default BlogList