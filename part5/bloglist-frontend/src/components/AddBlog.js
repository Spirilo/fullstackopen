import { useState } from "react"
import blogService from '../services/blogs'
import Notification from "./Notification"


const AddBlog = ({toggle}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [msg, setMsg] = useState(null)
  


  const addBlog = async ev => {
    ev.preventDefault()
    const blog = {title, author, url}
    try {
      const added = await blogService.create(blog)
      setMsg(`a new blog ${title} by ${author} was added!`)
      setTimeout(() => {
        setMsg(null)
        toggle()
      }, 1000)
    } catch (error) {
      setMsg('error adding a new blog')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
    
  }
  
  return (
    <div>
      <Notification message={msg} color='orange' />
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

export default AddBlog