const express = require('express')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const cors = require('cors')
const routes = require('./routes/index')
const { requestLogger, errorLogger } = require('./middlewares/logger')
require('dotenv').config()

// let nameDb;

// if (process.env.NODE_ENV === "production") {
//   nameDb = process.env.nameDb;
// } else {
//   nameDb = databaseURL;
// }

const { PORT = 3001 } = process.env
const app = express()

const options = {
  origin: ['http://localhost:3001', 'http://localhost:3000'],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true
}

app.use('*', cors(options.origin))

app.use(requestLogger)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('The server must crash')
  }, 0)
})

app.use(routes)

app.use(errorLogger)
app.use(errors())

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err

  res.status(statusCode).send({
    message:
      statusCode === 500 ? 'На сервере произошла ошибка' : message,
    statusCode: statusCode,
    error: err.error,
    status: 'bad'
  })
  next()
})

app.listen(PORT, () => {
  console.log(PORT)
})
