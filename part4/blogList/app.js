const express = require('express')
const router = require('./controllers/blogs')
const { MONGODB_URI } = require('./utils/config')
const mongoose = require('mongoose')
const { info, error } = require('./utils/logger')
const { requestLogger, errorHandler, unknownEndpoint } = require('./utils/middleware')

const app = express()

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    info('Connected to MongoDB')
  })
  .catch((err) => {
    error(err.message)
  })

app.use(express.json())
app.use(requestLogger)

app.use('/api/blogs', router)
app.use(unknownEndpoint)

app.use(errorHandler)

module.exports = app