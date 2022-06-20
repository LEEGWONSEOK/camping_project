const { campgroundSchema, reviewSchema } = require('../../utils/Schema');
const ExpressError = require('../../utils/ExpressError');
const Campground = require('../../models/campground');
const Review = require('../../models/review');

module.exports.isLoggedIn = (req, res, next) => {
  //console.log('req.user..', req.user);
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl;
    req.flash('error', '로그인 이후 가능합니다.');
    return res.redirect('/login');
  }
  next();
}

module.exports.validateCampground = (req, res, next) => {  
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.validateReview = (req, res, next) => {  
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground.host.equals(req.user._id)) {
    req.flash('error', '[알림] 허가되지 않은 계정입니다.');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.commenter.equals(req.user._id)) {
    req.flash('error', '[알림] 허가되지 않은 계정입니다.');
    return res.redirect(`/campgrounds/${id}`);
  }
  next();
}