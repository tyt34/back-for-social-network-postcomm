const jwt = require('jsonwebtoken');
const NeedAuth = require('../errors/need-auth');
const { jwtNotSecret } = require('../configBackend');
require('dotenv').config();

let soup;

if (process.env.NODE_ENV === 'production') {
  soup = process.env.JWT_SECRET;
} else {
  soup = jwtNotSecret;
}

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new NeedAuth());
  } else {
    const token = authorization.replace('Bearer ', '');
    let payload;
    try {
      payload = jwt.verify(token, soup);
    } catch (e) {
      next(new NeedAuth());
    }
    req.user = payload;
    next();
  }
};
