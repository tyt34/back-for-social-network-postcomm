const Comment = require('../models/comment');
//const User = require('../models/user');

module.exports.createComment = (req, res, next) => {
  console.log(' cr com: ', req.body)
  const {
    idPost, comment, dateText, dateUTC
  } = req.body;
  Comment.create({
    idPost,
    comment,
    dateText,
    dateUTC,
    owner: req.user._id
  })
  .then((user) => {
    console.log(' norm ')
    return res.status(200).send({
      status: 'ok',
    });
  })
  .catch((err) => {
    console.log(' ERR : ', err)
    next(err);
  });
};

module.exports.getComments = (req, res, next) => {
  console.log(' getComments ', req.params.postID)
  Comment.find({ idPost: req.params.postID })
  .then((mess) => {
    console.log(mess)
    return res.status(200).send({
      data: mess,
      status: 'ok',
    });
  })
  .catch(next);
}
