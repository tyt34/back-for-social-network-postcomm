const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ValidationError = require('../errors/validation-error');
const WrongPass = require('../errors/wrong-pass');
const RepeatName = require('../errors/repeat-name');
const WrongKeys = require('../errors/wrong-keys');
const { jwtNotSecret } = require('../configBackend');

let soup;

if (process.env.NODE_ENV === 'production') {
  soup = process.env.JWT_SECRET;
} else {
  soup = jwtNotSecret;
}

module.exports.register = (req, res, next) => {
  const {
    name, surname, pass, email, phone, company, jobpost, avatar
  } = req.body;
  bcrypt.hash(req.body.pass, 11)
    .then((hash) => User.create({
      name,
      surname,
      pass: hash,
      email,
      phone,
      company,
      jobpost,
      avatar
    }))
    .then((user) => {
      if (!user) {
        throw new ValidationError();
      }
      const token = jwt.sign({ _id: user._id }, soup, { expiresIn: '7d' });
      return res.status(200).send({
        data: {
          name, surname,
        },
        status: 'ok',
        token: token,
      });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(err.message));
      } else if (err.code === 11000) {
        next(new RepeatName());
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { name, pass } = req.body;
  if ((name === undefined) || (pass === undefined)) {
    throw new WrongKeys();
  }
  User.findOne({ name }).select('+pass')
    .then((user) => {
      if (!user) {
        return Promise.reject(new WrongPass());
      }
      return bcrypt.compare(pass, user.pass)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new WrongPass());
          }
          return user;
        });
    })
    .then((user) => {
      if (!user) {
        Promise.reject(new WrongPass());
      }
      const token = jwt.sign({ _id: user._id }, soup, { expiresIn: '7d' });
      res.send(
        {
          token: token,
          userId: user._id,
          status: 'ok',
          user: {
            name: user.name,
            surname: user.surname
          }
        }
      );
    })
    .catch(() => {
      next(new WrongPass());
    });
};
