const mongoose = require('mongoose');
const { Schema } = mongoose;

// Make Schema
const ReviewSchema = new Schema({
  comment: String,
  rating: Number,
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Review', ReviewSchema);