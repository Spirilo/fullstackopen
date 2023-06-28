const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUser = {
    _id: '64749ccc101ce82a335dc296',
    username: 'Spirilo',
    name: 'Niko',
    passwordHash: '$2b$10$ygQOwY5XCpRY2UhLYBcgGu6wUSu5A5gqO9Vi9kmgHvvz1BkXWbTRG',
    __v: 0
}
beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUser)
})

describe('user creation tests', () => {
  test('POST to /api/users return 400 if username too short', async () => {
    const newUser = {
      username: 'Jk',
      user: 'Testi',
      password: 'testi123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('POST to /api/users return 400 if username is missing', async () => {
    const newUser = {
      user: 'Testi',
      password: 'testi123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('POST to /api/users return 400 if username is already in use', async () => {
    const newUser = {
      username: 'Spirilo',
      user: 'Vinkki',
      password: 'testi123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('POST to /api/users return 400 if password is too short', async () => {
    const newUser = {
      username: "Mallikas",
      user: 'Testi',
      password: 'te'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
  test('POST to /api/users return 400 if password is missing', async () => {
    const newUser = {
      username: 'Testailija',
      user: 'Testi',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })
})

afterAll(async () => {
    await mongoose.connection.close()
})