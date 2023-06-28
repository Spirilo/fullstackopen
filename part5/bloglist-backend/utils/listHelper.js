const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  let obj = {
    title: 'Test',
    author: 'Start',
    likes: -100
  }
  blogs.forEach(blog => {
    if (blog.likes > obj.likes) {
      obj.title = blog.title
      obj.author = blog.author
      obj.likes = blog.likes
    }
  })
  return obj
}

const iterate = (blog) => blog.author

const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, iterate)
  const authors = _.mapValues(grouped, (p) => p.length)
  let most = Object.entries(authors).reduce((first, other) => first[1] > other[1] ? first : other)
  return {author: most[0], blogs: most[1]}
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, iterate)
  const likes = _.mapValues(grouped, totalLikes)
  let most = Object.entries(likes).reduce((first, other) => first[1] > other[1] ? first : other)
  console.log(most)
  return {author: most[0], likes: most[1]}
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}