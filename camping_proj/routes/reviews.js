const express = require('express');
const router = express.Router({ mergeParams: true }); // ':id' merge
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { reviewSchema } = require('../utils/Schema');
const { isLoggedIn } = require('./middleware/middleware');

const Campground = require('../models/campground');
const Review = require('../models/review');

const validateReview = (req, res, next) => {  
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

// Create Review
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id);
  const review = new Review(req.body.review);
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  res.redirect(`/campgrounds/${campground._id}`);
}))

// Delete Review
router.delete('/:reviewId', isLoggedIn, catchAsync(async (req, res) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;