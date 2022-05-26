const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  surname: {
    type: String,
  },
  pass: {
    type: String,
  },
});

module.exports = mongoose.model('user', userSchema);
