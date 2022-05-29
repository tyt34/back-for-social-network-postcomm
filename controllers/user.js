const User = require('../models/user');
const NotFoundError = require('../errors/not-found-error');
const CastError = require('../errors/cast-error');
const ValidationError = require('../errors/validation-error');
const WrongKeys = require('../errors/wrong-keys');
const RepeatName = require('../errors/repeat-name');
const NotNewInfo = require('../errors/not-new-info');

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError();
      }
      let {name, surname, email, phone, company, jobpost, avatar} = user
      return res.status(200).send({
        name,
        surname,
        email,
        phone,
        company,
        jobpost,
        avatar
      });
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
  let {name, surname, email, phone, company, jobpost, avatar} = req.body
  console.log(' 1 ')
  User.findOne({ name })
    .then((info) => {
      console.log(' 2')
      console.log(' ----------')
      console.log(info)
      console.log(name, surname, email, phone, company, jobpost, avatar)
      console.log(' ----------')
      if (info === null) {
        console.log(' 3')
        updateNewInfo(name, surname, email, phone, company, jobpost, avatar, req.user._id, res, next);
      } else if ((req.user._id !== info._id.toString())) {
        console.log(' 4')
        next(new RepeatName());
      } else if (
        (info.name === name) &&
        (info.surname === surname) &&
        (info.email === email) &&
        (info.phone === phone) &&
        (info.company === company) &&
        (info.jobpost === jobpost)
      ) {
        console.log(' 5')
        throw new NotNewInfo();
      } else if (info.email === email) {
        console.log(' 6')
        updateNewInfo(name, surname, email, phone, company, jobpost, avatar, req.user._id, res, next);
      } else {
        console.log(' 7')
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

function updateNewInfo(name, surname, email, phone, company, jobpost, avatar, id, res, next) {
  console.log(' 8', id)
  User.findByIdAndUpdate(
    {
      _id: id,
    },
    {
      name, surname, email, phone, company, jobpost, avatar
    },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      console.log(' 9', user)
      if (!user) {
        throw new NotFoundError();
      }
      let {name, surname, email, phone, company, jobpost, avatar} = user
      return res.status(200).send({
        name, surname, email, phone, company, jobpost, avatar
      });
    })
    .catch((err) => {
      next(err);
    });
}
