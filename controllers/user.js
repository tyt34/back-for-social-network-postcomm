const User = require('../models/user')
const NotFoundError = require('../errors/not-found-error')
const CastError = require('../errors/cast-error')
const ValidationError = require('../errors/validation-error')
const WrongKeys = require('../errors/wrong-keys')
const RepeatName = require('../errors/repeat-name')
const NotNewInfo = require('../errors/not-new-info')
const { db } = require('../db.js')

module.exports.getUser = (req, res, next) => {
  const idUser = req.user._id
  console.log({ idUser })

  db.findOne({ _id: idUser }, { pass: -1, type: -1 }, (err, user) => {
    console.log({ user })
    try {
      const { name, surname, email, phone, company, jobpost, avatar } =
        user

      return res.status(200).send({
        name,
        surname,
        email,
        phone,
        company,
        jobpost,
        avatar
      })
    } catch (error) {
      console.log(' --> ', error)
      next(new ValidationError())
    }
  })
}

module.exports.getAva = (req, res, next) => {
  User.find({ _id: req.params.userId })
    .then((mess) => {
      return res.status(200).send({
        name: mess[0].name,
        surname: mess[0].surname,
        email: mess[0].email,
        phone: mess[0].phone,
        company: mess[0].company,
        jobpost: mess[0].jobpost,
        avatar: mess[0].avatar,
        status: 'ok'
      })
    })
    .catch(next)
}

module.exports.getAllUsers = (req, res, next) => {
  console.log(' --> ')
  db.find({ type: 'user' }, { pass: -1, type: -1 }, (err, users) => {
    console.log({ err, users })
    return res.status(200).send({
      users,
      status: 'ok'
    })
  })
}

module.exports.updateUser = (req, res, next) => {
  let { name, surname, email, phone, company, jobpost, avatar } =
    req.body

  /**
   * я понимаю что за юзер
   * нахожу его текущие данные
   * проверяю есть ли изменения
   * если нет то ошибка
   * если да то
   * проверяю занято ли имя
   * если не занято то меняю
   * если занято то ошибка
   */

  // console.log({ user: req.user })
  const idUser = req.user._id

  // db.find({ type: 'user' }, (err, users) => {
  //   console.log({ a: users })
  // })

  // db.find({ type: 'user' }, (err, users) => {
  //   console.log({ b: users })
  // })

  db.find({ _id: idUser }, (err, users) => {
    const user = users[0]
    // console.log(' 1) ', idUser, users.length, !!users.length)
    if (users.length) {
      // console.log(' 2) ')
      db.find({ name }, (err, users) => {
        // console.log(' 3) ')
        if (users.length) {
          // console.log(' 4) ')
          next(new RepeatName())
        } else {
          // console.log(' 5) ')
          // console.log('Not find new name ')
          if (
            user.surname === surname &&
            user.email === email &&
            user.phone === phone &&
            user.company === company &&
            user.jobpost === jobpost &&
            user.avatar === avatar
          ) {
            // console.log(' 6) ')
            // console.log(' not change ')
            next(new NotNewInfo())
          } else {
            // console.log(' 7) ')
            // console.log(' is change ')
            db.update(
              { _id: idUser },
              {
                $set: {
                  name,
                  surname,
                  email,
                  phone,
                  company,
                  jobpost,
                  avatar
                }
              },
              { multi: true },
              (err, numReplaced) => {
                // console.log(' 8) ')
                // console.log({ err, numReplaced })
                return res.status(200).send({
                  name,
                  surname,
                  email,
                  phone,
                  company,
                  jobpost,
                  avatar
                })
              }
            )
          }
        }
      })
    } else {
      // console.log(' 9) ')
      next(new NotFoundError())
    }
  })
}

const updateNewInfo = (
  name,
  surname,
  email,
  phone,
  company,
  jobpost,
  avatar,
  id,
  res,
  next
) => {
  User.findByIdAndUpdate(
    {
      _id: id
    },
    {
      name,
      surname,
      email,
      phone,
      company,
      jobpost,
      avatar
    },
    {
      new: true,
      runValidators: true
    }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError()
      }
      let { name, surname, email, phone, company, jobpost, avatar } =
        user
      return res.status(200).send({
        name,
        surname,
        email,
        phone,
        company,
        jobpost,
        avatar
      })
    })
    .catch((err) => {
      next(err)
    })
}
