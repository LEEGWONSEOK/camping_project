const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateCamp, isAuthor } = require('./middleware/middleware');
const campCtrl = require('../controllers/campgrounds');
const AWS = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_KEY,
  region: process.env.AWS_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'leestart1023-camping-proj',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
});

// All Campgrounds
router.get('/', catchAsync(campCtrl.readAllCamp));

// Create Campground
router.get('/new', isLoggedIn, campCtrl.readNewCamp);
router.post('/', isLoggedIn, upload.array('image'), validateCamp, catchAsync(campCtrl.createCamp));

// Show Campground
router.get('/:id', catchAsync(campCtrl.readCamp));

// Update Campground
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campCtrl.readCampEdit));
router.put('/:id', isLoggedIn, isAuthor, validateCamp, catchAsync(campCtrl.updateCamp));

// Delete Campground
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campCtrl.deleteCamp));

module.exports = router;