const validator = require('validator');
const { celebrate, Joi } = require('celebrate');

const validateURL = (value) => {
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error('Неправильный формат ссылки');
  }
  return value;
};

module.exports.logValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    pass: Joi.string().required(),
  }),
});

module.exports.regValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
    surname: Joi.string().required(),
    pass: Joi.string().required(),
  }),
});

module.exports.creMovValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(validateURL),
    trailer: Joi.string().required().custom(validateURL),
    thumbnail: Joi.string().required().custom(validateURL),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

module.exports.getMovValidator = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().length(24).hex(),
  }),
});

module.exports.updatUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().min(2).max(30),
  }),
});
