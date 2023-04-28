const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const ValidationError = require('../errors/validation-error')
const WrongPass = require('../errors/wrong-pass')
const RepeatName = require('../errors/repeat-name')
const WrongKeys = require('../errors/wrong-keys')
const { jwtNotSecret } = require('../configBackend')
const Datastore = require('nedb')
const db = new Datastore({
  filename: './database/database.JSON',
  autoload: true
  // corruptAlertThreshold: 1
})

let soup

if (process.env.NODE_ENV === 'production') {
  soup = process.env.JWT_SECRET
} else {
  soup = jwtNotSecret
}

module.exports.register = (req, res, next) => {
  const {
    name,
    surname,
    pass,
    email,
    phone,
    company,
    jobpost,
    avatar
  } = req.body
  console.log({ name })

  console.log(' --> check in db')

  db.find({ name, surname }, (err, user) => {
    if (!user.length) {
      bcrypt
        .hash(pass, 11)
        .then((hash) => {
          const user = {
            name,
            surname,
            pass: hash,
            email,
            phone,
            company,
            jobpost,
            avatar
          }
          db.insert(user, (err, newDoc) => {
            if (err) {
              console.error(err)
            } else {
              console.log('User added:', newDoc.name)
              const token = jwt.sign({ _id: user._id }, soup, {
                expiresIn: '7d'
              })
              return res.status(200).send({
                data: {
                  name,
                  surname
                },
                status: 'ok',
                token: token
              })
            }
          })
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(err.message))
          } else if (err.code === 11000) {
            next(new RepeatName())
          } else {
            next(err)
          }
        })
    } else {
      console.log(' ERROR RepeatName')
      next(new RepeatName())
    }
  })
}

module.exports.login = (req, res, next) => {
  const { name, pass } = req.body
  if (name === undefined || pass === undefined) {
    throw new WrongKeys()
  }
  console.log({ name, pass })

  db.find({ name }, (err, users) => {
    console.log({ err, l: users.length })
    if (users.length) {
      console.log('Found users:', users)
      console.log(' p: ', users[0].pass)

      bcrypt
        .compare(pass, users[0].pass)
        .then((matched) => {
          console.log({ matched })
          if (matched) {
            console.log(' USER TRUE ')
            const token = jwt.sign({ _id: users[0]._id }, soup, {
              expiresIn: '7d'
            })
            console.log({ token })
            res.send({
              token: token,
              userId: users[0]._id,
              status: 'ok',
              user: {
                name: users[0].name,
                surname: users[0].surname
              }
            })
          } else {
            next(new WrongPass())
          }
        })
        .catch((er) => {
          /**
           * Я не знаю какая тут может быть ошибка
           */
          console.log({ er })
          next(new WrongPass())
        })
    } else {
      next(new WrongPass())
    }
  })
}
