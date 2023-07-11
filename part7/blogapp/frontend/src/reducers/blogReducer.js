import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlogs(state, action) {
      state = action.payload
      return state
        .sort((a, b) => b.likes - a.likes)
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    addLike(state, action) {
      const likedBlog = action.payload
      const id = likedBlog.id
      return state
        .map(blog => blog.id !== id ? blog : likedBlog)
        .sort((a,b) => b.likes - a.likes)
    },
    removeBlog(state, action) {
      const id = action.payload
      return state
        .filter(blog => blog.id !== id)
    }
  }
})

export const { setBlogs, addBlog, addLike, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const updateBlog = blog => {
  return async dispatch => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    const updated = await blogService.save(blog.id, updatedBlog)
    dispatch(addLike(updated))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.dlt(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer