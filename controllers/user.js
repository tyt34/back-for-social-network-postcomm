const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const ValidationError = require('../errors/validation-error');
const WrongKeys = require('../errors/wrong-keys');
const RepeatName = require('../errors/repeat-name');
const NotNewInfo = require('../errors/not-new-info');

function updateNewInfo(name, email, id, res, next) {
  User.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name,
      email,
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      return res.status(200).send(user);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      return res.status(200).send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new CastError());
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name } = req.body;
  const mail = req.body.email;
  if ((name === undefined) && (mail === undefined)) {
    throw new WrongKeys();
  }
  User.findOne({ email: mail })
    .then((info) => {
      if (info === null) {
        updateNewInfo(name, mail, req.user._id, res, next);
      } else if ((req.user._id !== info._id.toString())) {
        next(new RepeatName());
      } else if ((info.name === name) && (info.email === mail)) {
        throw new NotNewInfo();
      } else if (info.email === mail) {
        updateNewInfo(name, mail, req.user._id, res, next);
      } else {
        next(new RepeatName());
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError());
      } else if (err.name === 'NotFoundError') {
        next(new NotFoundError());
      } else {
        next(err);
      }
    });
};
