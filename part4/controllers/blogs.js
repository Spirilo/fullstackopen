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

blogsRouter.put('/:id', async (request, response) => {
  const body = await Blog.findById(request.params.id)
  if (!body) return response.status(404).end()
  let updatedBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  await Blog.findByIdAndUpdate(request.params.id, updatedBlog)
  const all = await Blog.find({})
  console.log(all)
  response.status(204).end()

})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter