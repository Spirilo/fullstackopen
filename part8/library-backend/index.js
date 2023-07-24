const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid} = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')
const author = require('./models/author')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((err) => {
    console.log('error connection to MongoDB:', err.message)
  })

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result
      if(args.genre) result = await Book.find({ genres: args.genre }).populate('author')
      else result = await Book.find({}).populate('author')
      
      if(args.author) result = result.filter(b => b.author.name === args.author)
      console.log(result)
      return result
    },
    allAuthors: async () => Author.find({})
  },
  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({name: name})
      return Book.countDocuments({author: author})
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let book
      const author = await Author.findOne({name: args.author})
      if(!author) {
        const newAuthor = new Author({name: args.author})
        await newAuthor.save()
        book = new Book({...args, author: newAuthor})
      } else {
        book = new Book({...args, author: author})
      }

      await book.save()
      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      if(!author) return null

      const updatedAuthor = { ...author._doc, born: args.setBornTo}
      await Author.findByIdAndUpdate(author, updatedAuthor, {new: true})
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})