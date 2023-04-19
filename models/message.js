const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  dateText: {
    type: String
  },
  dateUTC: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId
  }
})

module.exports = mongoose.model('message', messageSchema)
