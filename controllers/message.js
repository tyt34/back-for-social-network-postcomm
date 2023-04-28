const { db } = require('../db.js')

module.exports.createMes = (req, res, next) => {
  const { header, text, dateText, dateUTC } = req.body
  const idUser = req.user._id
  console.log({ idUser, header, text, dateText, dateUTC })

  db.insert(
    {
      type: 'message',
      owner: idUser,
      header,
      text,
      dateText,
      dateUTC
    },
    (err, newMessage) => {
      console.log({ newMessage })
      if (err) {
        next(err)
      } else {
        console.log('Message added:', newMessage.header)
        return res.status(200).send({
          data: {
            message: {
              header,
              text,
              dateText,
              dateUTC,
              owner: idUser,
              _id: newMessage._id
            }
          },
          status: 'ok'
        })
      }
    }
  )
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
