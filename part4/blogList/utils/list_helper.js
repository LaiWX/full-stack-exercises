const { info } = require('./logger')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => {
    return total + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((currFavorite, blog) => {
    return currFavorite && currFavorite.likes >= blog.likes
      ? currFavorite
      : blog
  }, {})
}

const mostBlogs = (blogs) => {
  const counts = blogs.reduce((acc, blog) => {
    const author = blog.author
    if (acc[author]) {
      acc[author]++
    } else {
      acc[author] = 1
    }
    return acc
  }, {})

  return Object.entries(counts).reduce((bestAuthor, [author, blogs]) => {
    return bestAuthor && bestAuthor.blogs >= blogs
      ? bestAuthor
      : { author, blogs}
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
}