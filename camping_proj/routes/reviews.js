const express = require('express');
const router = express.Router({ mergeParams: true }); // ':id' merge
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('./middleware/middleware');

const Campground = require('../models/campground');
const Review = require('../models/review');


// Create Review
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  review.commenter = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  console.log(review.commenter);
  res.redirect(`/campgrounds/${campground._id}`);
}))

// Delete Review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;