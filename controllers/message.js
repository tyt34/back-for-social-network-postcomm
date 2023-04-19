const Message = require('../models/message')
const User = require('../models/user')

module.exports.createMes = (req, res, next) => {
  const { header, text, dateText, dateUTC } = req.body
  Message.create({
    header,
    text,
    dateText,
    dateUTC,
    owner: req.user._id
  })
    .then((user) => {
      return res.status(200).send({
        data: {
          user
        },
        status: 'ok'
      })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports.getAllMes = (req, res, next) => {
  Message.find({ owner: req.params.userId })
    .then((mess) => {
      return res.status(200).send({
        data: mess,
        status: 'ok'
      })
    })
    .catch(next)
}

module.exports.getMesUser = (req, res, next) => {
  User.find({ name: req.params.nameUser })
    .then((mess) => {
      Message.find({ owner: mess[0]._id })
        .then((mess) => {
          return res.status(200).send({
            data: mess,
            status: 'ok'
          })
        })
        .catch(next)
    })
    .catch(next)
}

module.exports.getMesProf = (req, res, next) => {
  Message.find({ owner: req.user._id })
    .then((mess) => {
      return res.status(200).send({
        data: mess,
        status: 'ok'
      })
    })
    .catch(next)
}

module.exports.getPost = (req, res, next) => {
  Message.find({ _id: req.params.idPost })
    .then((mess) => {
      return res.status(200).send({
        data: mess,
        status: 'ok'
      })
    })
    .catch(next)
}
