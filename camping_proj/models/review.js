const mongoose = require('mongoose');
const { Schema } = mongoose;

// Make Schema
const ReviewSchema = new Schema({
  comment: String,
  rating: Number
})

module.exports = mongoose.model('Review', ReviewSchema);