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

// module.exports.getAllMes = (req, res, next) => {
//   db.find(
//     { type: 'message' },
//     { pass: -1, type: -1 },
//     (err, messages) => {
//       console.log({ err, messages })
//       return res.status(200).send({
//         messages,
//         status: 'ok'
//       })
//     }
//   )
//   /* Message.find({ owner: req.params.userId })
//     .then((mess) => {
//       return res.status(200).send({
//         data: mess,
//         status: 'ok'
//       })
//     })
//     .catch(next) */
// }

module.exports.getMesUser = (req, res, next) => {
  const findUser = req.params.nameUser
  console.log({ findUser })
  console.log(' get message user ')

  db.findOne({ name: findUser }, (err, user) => {
    console.log({ user })

    db.find(
      { type: 'message', owner: user._id },
      { pass: -1, type: -1 },
      (err, messages) => {
        console.log({ err, l: messages.length })
        return res.status(200).send({
          data: messages,
          status: 'ok'
        })
      }
    )
  })
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
