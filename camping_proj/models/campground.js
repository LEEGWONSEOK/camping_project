const mongoose = require('mongoose');
const Review = require('./review');
const { Schema } = mongoose;

// Make Schema
const CampgroundSchema = new Schema({
  title: String,
  price: Number,
  description: String,
  image: String,
  location: String,
  host: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

// mongoose Middleware
CampgroundSchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: { $in: doc.reviews }
    })
  }
})

module.exports = mongoose.model('Campground', CampgroundSchema);