const User = require('../models/user');

module.exports.readRegister = (req, res) => {
  if (req.user) {
    return res.redirect('/campgrounds');
  }
  res.render('users/register');
}

module.exports.createRegister = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, err => {
      if (err) return next(err);
      req.flash('success', `[알림] '${username}'님 환영합니다!`);
      res.redirect('/campgrounds');
    })
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('/register');  
  }
}

module.exports.readLogin = (req, res) => {
  if (req.user) {
    return res.redirect('/campgrounds');
  }
  console.log('❌ get login', req.session.returnTo);
  console.log('❌ get login', req.session);
  res.render('users/login');
}

module.exports.createLogin = (req, res) => {
  console.log('❌ post login', req.session); // error! 514 참고
  const { username } = req.body;
  const redirectUrl = req.session.returnTo || '/campgrounds';
  req.flash('success', `[알림] '${username}'님 환영합니다!`);
  res.redirect(redirectUrl);
}

module.exports.readLogout = (req, res) => {
  req.logout(function (err) {
    if (err) next(err);
    res.redirect('/campgrounds');
  });
}