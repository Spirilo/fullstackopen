import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (ev) => {
    ev.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={addBlog}>
        <div>
          <TextField
            id='title-input'
            value={title}
            label='title'
            onChange={ev => setTitle(ev.target.value)}
          />
        </div>
        <div>
          <TextField
            id='author-input'
            value={author}
            label='author'
            onChange={ev => setTitle(ev.target.value)}
          />
        </div>
        <div>
          <TextField
            id='url-input'
            value={url}
            label='url'
            onChange={ev => setTitle(ev.target.value)}
          />
        </div>
        <Button variant='outlined' type="submit">add</Button>
      </form>
    </div>
  )
}

export default BlogForm
