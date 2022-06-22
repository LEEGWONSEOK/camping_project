const express = require('express');
const router = express.Router({ mergeParams: true }); // ':id' merge
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateReview, isReviewAuthor } = require('./middleware/middleware');
const reviewCtrl = require('../controllers/reviews');

// Create Review
router.post('/', isLoggedIn, validateReview, catchAsync(reviewCtrl.createReview))

// Delete Review
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviewCtrl.deleteReview))

module.exports = router;