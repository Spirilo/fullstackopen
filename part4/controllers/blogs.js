const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  let blogs = await Blog.find({})
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (body.title === undefined || body.url === undefined) {
    return response.status(400).end()
  } 
  let blog = new Blog({
    author: body.author,
    title: body.title,
    likes: body.likes || 0,
    url: body.url
  })
  
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)
})

module.exports = blogsRouter