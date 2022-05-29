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
    email: Joi.string().required(),
    phone: Joi.string().required(),
    company: Joi.string().required(),
    jobpost: Joi.string().required(),
    avatar: Joi.string().required(),
  }),
});
