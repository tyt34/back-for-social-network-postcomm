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

  db.find({ name, pass }, (err, docs) => {
    if (err) {
      console.error(err)
      return Promise.reject(new WrongPass())
    } else {
      console.log('Found users:', docs)
    }
  })

  /*
  User.findOne({ name })
    .select('+pass')
    .then((user) => {
      if (!user) {
        return Promise.reject(new WrongPass())
      }
      return bcrypt.compare(pass, user.pass).then((matched) => {
        if (!matched) {
          return Promise.reject(new WrongPass())
        }
        return user
      })
    })
    .then((user) => {
      if (!user) {
        Promise.reject(new WrongPass())
      }
      const token = jwt.sign({ _id: user._id }, soup, {
        expiresIn: '7d'
      })
      res.send({
        token: token,
        userId: user._id,
        status: 'ok',
        user: {
          name: user.name,
          surname: user.surname
        }
      })
    })
    .catch(() => {
      next(new WrongPass())
    })
    */
}
