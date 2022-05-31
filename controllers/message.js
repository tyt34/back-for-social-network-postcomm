const Message = require('../models/message');
const User = require('../models/user');

module.exports.createMes = (req, res, next) => {
  const {
    header, text, dateText, dateUTC
  } = req.body;
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
      status: 'ok',
    });
  })
  .catch((err) => {
    next(err);
  });
};

module.exports.getAllMes = (req, res, next) => {
  //console.log(' getAllMes ', req.params.userId)
  Message.find({ owner: req.params.userId })
  .then((mess) => {
    //console.log(mess)
    return res.status(200).send({
      data: mess,
      status: 'ok',
    });
  })
  .catch(next);
}

module.exports.getMesUser = (req, res, next) => {
  //console.log(' getMesUser ', req.params.nameUser)
  // надо найти id пользователя по имени
  User.find({ name: req.params.nameUser })
  .then((mess) => {
    //console.log(' find user:', mess)
    //console.log(' id user: ', mess[0]._id)
    Message.find({ owner: mess[0]._id })
    .then((mess) => {
      //console.log(mess)
      return res.status(200).send({
        data: mess,
        status: 'ok',
      });
    })
    .catch(next);
  })
  .catch(next);
  /*
  // надо найти сообщения пользователя по id
  Message.find({ name: req.params.nameUser })
  .then((mess) => {
    console.log(mess)
    return res.status(200).send({
      data: mess,
      status: 'ok',
    });
  })
  .catch(next);
  */
}

module.exports.getMesProf = (req, res, next) => {
  //console.log(' getMesProf ', req.user._id)
  Message.find({ owner: req.user._id })
  .then((mess) => {
    //console.log(mess)
    return res.status(200).send({
      data: mess,
      status: 'ok',
    });
  })
  .catch(next);
}

module.exports.getPost = (req, res, next) => {
  //console.log(' getPost ', req.params.idPost)
  Message.find({ _id: req.params.idPost })
  .then((mess) => {
    //console.log(mess)
    return res.status(200).send({
      data: mess,
      status: 'ok',
    });
  })
  .catch(next);
}
