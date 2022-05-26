const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (validationLink) => validator.isURL(validationLink),
      message: (props) => `${props.value} это не соответствует ссылки на картинку карточки!`,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: (validationLink) => validator.isURL(validationLink),
      message: (props) => `${props.value} это не соответствует ссылки на картинку карточки!`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (validationLink) => validator.isURL(validationLink),
      message: (props) => `${props.value} это не соответствует ссылки на картинку карточки!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
