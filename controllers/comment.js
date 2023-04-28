const Comment = require('../models/comment')
const { db } = require('../db.js')

module.exports.createComment = (req, res, next) => {
  const { idPost, comment, dateText, dateUTC } = req.body
  Comment.create({
    idPost,
    comment,
    dateText,
    dateUTC,
    owner: req.user._id
  })
    .then((user) => {
      return res.status(200).send({
        status: 'ok'
      })
    })
    .catch((err) => {
      next(err)
    })
}

module.exports.getComments = (req, res, next) => {
  Comment.find({ idPost: req.params.postID })
    .then((mess) => {
      return res.status(200).send({
        data: mess,
        status: 'ok'
      })
    })
    .catch(next)
}
