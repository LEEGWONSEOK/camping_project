
module.exports.isLoggedIn = (req, res, next) => {
  console.log('req.user..', req.user);
  if (!req.isAuthenticated()) {
    req.flash('error', '로그인 이후 가능합니다.');
    return res.redirect('/login');
  }
  next();
}

