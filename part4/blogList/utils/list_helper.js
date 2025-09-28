const dummy = () => {
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

  return Object.entries(counts).reduce((mostHardworkingAuthor, [author, blogs]) => {
    return mostHardworkingAuthor && mostHardworkingAuthor.blogs >= blogs
      ? mostHardworkingAuthor
      : { author, blogs}
  }, {})
}

const mostLikes = (blogs) => {
  const likesCounts = blogs.reduce((acc, blog) => {
    const author = blog.author
    if (acc[author]) {
      acc[author] = acc[author] + blog.likes
    } else {
      acc[author] = blog.likes
    }
    return acc
  }, {})

  return Object.entries(likesCounts).reduce((mostPopularAuthor, [author, likes]) => {
    return mostPopularAuthor && mostPopularAuthor.likes >= likes
      ? mostPopularAuthor
      : { author, likes}
  }, {})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}