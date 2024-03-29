const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 4
  },
  favoriteGenre: {
    type: String,
    required: true,
    minlength: 3
  }
})

module.exports = mongoose.model('User', schema)