import { useState } from "react"

const BlogForm = ({toggle, createBlog}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  


  const addBlog = async ev => {
    ev.preventDefault()
    createBlog({
      title,
      author,
      url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
    toggle()
  }
  
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>
          title: 
          <input 
            type="text" 
            value={title} 
            onChange={ev => setTitle(ev.target.value)} 
            />
        </div>
        <div>
          author:
          <input 
            type="text" 
            value={author} 
            onChange={ev => setAuthor(ev.target.value)} 
            />
        </div>
        <div>
          url:
          <input 
            type="text" 
            value={url} 
            onChange={ev => setUrl(ev.target.value)} 
            />
        </div>
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default BlogForm