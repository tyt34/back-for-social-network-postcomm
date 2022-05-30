const Message = require('../models/message');
const User = require('../models/user');

module.exports.createMes = (req, res, next) => {
  //console.log(' => ')
  const {
    header, text, dateText, dateUTC
  } = req.body;
  //console.log(' ==> ', header, text)
  //console.log(' ===> ', req.user._id)
  Message.create({
    header,
    text,
    dateText,
    dateUTC,
    owner: req.user._id
  })
  .then((user) => {
    //console.log(' => > ', user)
    return res.status(200).send({
      data: {
        header, text,
      },
      status: 'ok',
    });
  })
  .catch((err) => {
    //console.log(' bad ')
    //console.log('Err#1 ',err)
    next(err);
  });
};

module.exports.getAllMes = (req, res, next) => {
  console.log(' getAllMes ', req.params.userId)
  Message.find({ owner: req.params.userId })
  .then((mess) => {
    console.log(mess)
    return res.status(200).send({
      data: mess,
      status: 'ok',
    });
  })
  .catch(next);
}

module.exports.getMesUser = (req, res, next) => {
  console.log(' getMesUser ', req.params.nameUser)
  // надо найти id пользователя по имени
  User.find({ name: req.params.nameUser })
  .then((mess) => {
    console.log(' find user:', mess)
    console.log(' id user: ', mess[0]._id)
    Message.find({ owner: mess[0]._id })
    .then((mess) => {
      console.log(mess)
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
  console.log(' getMesProf ', req.user._id)
  Message.find({ owner: req.user._id })
  .then((mess) => {
    console.log(mess)
    return res.status(200).send({
      data: mess,
      status: 'ok',
    });
  })
  .catch(next);
}
