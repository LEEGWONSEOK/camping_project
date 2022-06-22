const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const userCtrl = require('../controllers/users');

// Register
router.get('/register', userCtrl.readRegister)
router.post('/register', catchAsync(userCtrl.createRegister))

// Login
router.get('/login', userCtrl.readLogin)
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), userCtrl.createLogin)

// Logout
router.get('/logout', userCtrl.readLogout)

module.exports = router;