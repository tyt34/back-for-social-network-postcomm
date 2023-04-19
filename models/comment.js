const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  idPost: {
    type: String,
    required: true
  },
  comment: {
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

module.exports = mongoose.model('comment', commentSchema)
