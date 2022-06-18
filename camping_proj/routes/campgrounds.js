const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { campgroundSchema } = require('../utils/Schema');

const Campground = require('../models/campground');

const validateCampground = (req, res, next) => {  
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
}

// All Campgrounds
router.get('', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}))

// Create Campground
router.get('/new', (req, res) => {
  res.render('campgrounds/new');
})

router.post('/', validateCampground, catchAsync(async (req, res) => {
  const campground = new Campground(req.body.campground);
  await campground.save();
  req.flash('success', '[알림] 새로운 캠핑장을 추가하셨습니다!');
  res.redirect(`/campgrounds/${campground._id}`);
}))

// Show Campground
router.get('/:id', catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate('reviews');
  if (!campground) {
    req.flash('error', '[알림] 캠핑장을 찾을 수가 없습니다.');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}))

// Update Campground
router.get('/:id/edit', catchAsync(async(req, res) => {
  const campground = await Campground.findById(req.params.id);
  res.render('campgrounds/edit', { campground });
}))

router.put('/:id', validateCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  req.flash('success', '[알림] 캠핑장 정보를 수정하셨습니다!');
  res.redirect(`/campgrounds/${campground._id}`);
}))

// Delete Campground
router.delete('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
}))

module.exports = router;