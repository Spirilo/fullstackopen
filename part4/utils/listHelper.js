const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = blogs.reduce((total, blog) => total + blog.likes, 0)
  return total
}

const favoriteBlog = (blogs) => {
  let obj = {
    title: 'Väärä',
    author: 'Väärä',
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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}