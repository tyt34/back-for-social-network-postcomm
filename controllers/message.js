const Message = require('../models/message');

module.exports.createMes = (req, res, next) => {
  console.log(' => ')
  const {
    header, text, dateText, dateUTC
  } = req.body;
  console.log(' ==> ', header, text)
  console.log(' ===> ', req.user._id)
  Message.create({
    header,
    text,
    dateText,
    dateUTC,
    owner: req.user._id
  })
  .then((user) => {
    console.log(' => > ', user)
    return res.status(200).send({
      data: {
        header, text,
      },
      status: 'ok',
    });
  })
  .catch((err) => {
    console.log(' bad ')
    console.log('Err#1 ',err)
    next(err);
  });

};
