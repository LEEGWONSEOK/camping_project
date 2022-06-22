const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCamp, isAuthor } = require('./middleware/middleware');
const campCtrl = require('../controllers/campgrounds');

// All Campgrounds
router.get('/', catchAsync(campCtrl.readAllCamp))

// Create Campground
router.get('/new', isLoggedIn, campCtrl.readNewCamp)
router.post('/', isLoggedIn, validateCamp, catchAsync(campCtrl.createCamp))

// Show Campground
router.get('/:id', catchAsync(campCtrl.readCamp))

// Update Campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campCtrl.readCampEdit))
router.put('/:id', isLoggedIn, isAuthor, validateCamp, catchAsync(campCtrl.updateCamp))

// Delete Campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campCtrl.deleteCamp))

module.exports = router;