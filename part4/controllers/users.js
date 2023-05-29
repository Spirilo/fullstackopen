const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  let users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const {username, name, password} = request.body
  if(password === undefined || password.length < 3) {
    return response.status(400).json({error: 'Password is missing or too short'})
  }
  if(username === undefined || username.length < 3) {
    return response.status(400).json({error: 'Username is missing or too short'})
  }

  const isUnique = await User.findOne({username})
  if(isUnique) {
    return response.status(400).json({error: 'Username is already in use!'})
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  
  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter