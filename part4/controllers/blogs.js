const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  response.json(blogs)
})


blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const user = request.user

  let blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes || 0,
    url: body.url,
    user: user.id
  })
  
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  if (!body) return response.status(404).end()
  let updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user.id
  }

  const updated = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, {new: true})

  response.json(updated)

})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    response.status(404).json({error: 'no blog found with id'}).end()
  } else if (blog.user.toString() === user.id) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({error: 'login to blog owner to delete blog'})
  }
})

module.exports = blogsRouter