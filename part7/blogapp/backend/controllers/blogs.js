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

blogsRouter.post('/:id/comments', async (request, response) => {
  const { comment } = request.body
  const blog = await Blog.findById(request.params.id)
  blog.comments.push(comment)
  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
  response.json(updatedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, url, author, likes } = request.body

  let updatedBlog = await Blog.findByIdAndUpdate(request.params.id,  { title, url, author, likes }, { new: true })

  updatedBlog = await Blog.findById(updatedBlog._id).populate('user') 

  response.json(updatedBlog)

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