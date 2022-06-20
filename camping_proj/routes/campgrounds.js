const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCampground, isAuthor } = require('./middleware/middleware');

const Campground = require('../models/campground');

// All Campgrounds
router.get('', catchAsync(async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render('campgrounds/index', { campgrounds });
}))

// Create Campground
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
})

router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
  const campground = new Campground(req.body.campground);
  campground.host = req.user._id;
  await campground.save();
  req.flash('success', '[알림] 새로운 캠핑장을 추가하셨습니다!');
  res.redirect(`/campgrounds/${campground._id}`);
}))

// Show Campground
router.get('/:id', catchAsync(async (req, res) => {
  const campground = await Campground.findById(req.params.id).populate({
    path: 'reviews',
    populate: {
      path: 'commenter'
    }
  }).populate('host');
  if (!campground) {
    req.flash('error', '[알림] 캠핑장을 찾을 수가 없습니다.');
    return res.redirect('/campgrounds');
  }
  res.render('campgrounds/show', { campground });
}))

// Update Campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async(req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) return res.redirect('/campgrounds');  
  res.render('campgrounds/edit', { campground });
}))

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
  req.flash('success', '[알림] 캠핑장 정보를 수정하셨습니다!');
  res.redirect(`/campgrounds/${campground._id}`);
}))

// Delete Campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds');
}))

module.exports = router;