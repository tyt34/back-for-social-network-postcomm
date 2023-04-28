const express = require('express')
const bodyParser = require('body-parser')
const { errors } = require('celebrate')
const cors = require('cors')
const routes = require('./routes/index')
const { requestLogger, errorLogger } = require('./middlewares/logger')
// import { Low } from 'lowdb'
// import { JSONFile } from 'lowdb/node'
// const JSONFile = require('lowdb/node')
// const db = new Low(new JSONFile('./database/database.JSON'), {})
// const Low = require('lowdb')
// const FileSync = require('lowdb/adapters/FileSync')
// const adapter = new FileSync('./database/database.JSON')
// const db = low(adapter)

// const Datastore = require('nedb')
// const db = new Datastore({
//   filename: './database/database.JSON',
//   autoload: true
//   // corruptAlertThreshold: 1
// })
// console.log({ db })

// const user = { name: 'John', age: 30 }

// db.insert(user, (err, newDoc) => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log('User added:', newDoc)
//   }
// })

// db.find({ name: 'John' }, (err, docs) => {
//   if (err) {
//     console.error(err)
//   } else {
//     console.log('Found users:', docs)
//   }
// })

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
