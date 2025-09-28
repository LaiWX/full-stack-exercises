const { test, describe } = require('node:test')
const assert = require('node:assert')
const { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes } = require('../utils/list_helper')

describe('test list_helper', () => {
  test('dummy return one', () => {
    assert.strictEqual(dummy(1), 1)
  })
})

describe('test totalLikes', () => {
  test('empty blog', () => {
    const blogs = []
    assert.strictEqual(totalLikes(blogs), 0)
  })

  test('only one blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    assert.strictEqual(totalLikes(listWithOneBlog), 5)
  })

  test('multiple blogs', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }
    ]
    assert.strictEqual(totalLikes(blogs), 36)
  })
})

describe('test favoriteBlog', () => {
  test('empty blog', () => {
    const blogs = []
    assert.deepStrictEqual(favoriteBlog(blogs), {})
  })

  test('only one blog', () => {
    const blogs = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
    assert.deepStrictEqual(favoriteBlog(blogs), blogs[0])
  })

  test('multiple blogs', () => {
    const blogs = [
      {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
      },
      {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
      },
      {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
      },
      {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
      },
      {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
      },
      {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
      }
    ]
    assert.deepStrictEqual(favoriteBlog(blogs), blogs[2])
  })
})

describe('test mostBlogs', () => {
  test('empty blog', () => {
    const blogs = []
    assert.deepStrictEqual(mostBlogs(blogs), {})
  })
  test('single blog', () => {
    const blogs = [
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 5,
      }
    ]
    assert.deepStrictEqual(mostBlogs(blogs), { author: "Robert" , blogs: 1})
  })
  test('multiple blogs by the same author', () => {
    const blogs = [
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 5,
      },
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 5,
      },
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 5,
      },
    ]
    assert.deepStrictEqual(mostBlogs(blogs), { author: "Robert" , blogs: 3 })
  })
  test('multiple blogs by different authors', () => {
    const blogs = [
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
      },
      {
        author: "FOO",
        url: "https://reactpatterns.com/",
      },
      {
        author: "Mike",
        url: "https://reactpatterns.com/",
      },
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
      },
    ]
    assert.deepStrictEqual(mostBlogs(blogs), { author: "Robert" , blogs: 2 })
  })
})

describe('test mostLikes', () => {
  test('empty blog', () => {
    const blogs = []
    assert.deepStrictEqual(mostLikes(blogs), {})
  })
  test('single blog', () => {
    const blogs = [
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 5,
      }
    ]
    assert.deepStrictEqual(mostLikes(blogs), { author: "Robert" , likes: 5})
  })
  test('multiple blogs by the same author', () => {
    const blogs = [
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 5,
      },
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 5,
      },
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 5,
      },
    ]
    assert.deepStrictEqual(mostLikes(blogs), { author: "Robert" , likes: 15 })
  })
  test('multiple blogs by different authors', () => {
    const blogs = [
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 2,
      },
      {
        author: "FOO",
        url: "https://reactpatterns.com/",
        likes: 5,
      },
      {
        author: "Mike",
        url: "https://reactpatterns.com/",
        likes: 2,
      },
      {
        author: "Robert",
        url: "https://reactpatterns.com/",
        likes: 2,
      },
    ]
    assert.deepStrictEqual(mostLikes(blogs), { author: "FOO" , likes: 5 })
  })
})
