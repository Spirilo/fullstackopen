const { GraphQLError } = require('graphql')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result
      if(args.genre) result = await Book.find({ genres: args.genre }).populate('author')
      else result = await Book.find({}).populate('author')
        
      if(args.author) result = result.filter(b => b.author.name === args.author)
      return result
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    allGenres: async () => {
      let result = []
      const books = await Book.find({})
      books.filter(b => {
        b.genres.filter(g => {
          if(!result.includes(g)) result = result.concat(g)
        })
      })
      return result
    }
  },
  Author: {
    bookCount: async ({ name }) => {
      const author = await Author.findOne({name: name})
      return Book.countDocuments({author: author})
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      let book
      const currentUser = context.currentUser

     if (!currentUser) {
        throw new GraphQLError('login to add book', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
  
      const author = await Author.findOne({name: args.author})
      if(!author) {
        const newAuthor = new Author({name: args.author})
        try {
          await newAuthor.save()
        } catch (error) {
          throw new GraphQLError('Saving book failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              error
            }
          })
        }
        book = new Book({...args, author: newAuthor})
      } else {
        book = new Book({...args, author: author})
      }
  
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({name: args.name})
      const currentUser = context.currentUser
      if (!author) return null
      if (!currentUser) {
        throw new GraphQLError('login to edit author', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
  
      const updatedAuthor = { ...author._doc, born: args.setBornTo}
      await Author.findByIdAndUpdate(author, updatedAuthor, {new: true})
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(err => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.name,
              err
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)
      if (!user || args.password !== 'salasana') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET)}
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers