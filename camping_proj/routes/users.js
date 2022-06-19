const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const passport = require('passport');
const User = require('../models/user');

// Register
router.get('/register', (req, res) => {
  res.render('users/register');
})

router.post('/register', catchAsync(async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.flash('success', `[알림] '${username}'님 환영합니다!`);
    res.redirect('/campgrounds');
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');  
  }
}))

// Login
router.get('/login', (req, res) => {
  if (req.user) {
    return res.redirect('/campgrounds');
  }
  res.render('users/login');
})

router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
  const { username } = req.body;
  req.flash('success', `[알림] '${username}'님 환영합니다!`);
  res.redirect('/campgrounds');
})

// Logout
router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) next(err);
    res.redirect('/campgrounds');
  });
})

module.exports = router;