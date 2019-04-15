const Admin = require('../models/admin');
const passport = require('passport');
const log = require('loglevel');

module.exports.registerAdmin = (req, res, next) => {
  log.info('Registering user');
  Admin.register(new Admin({
    username: req.body.username,
  }),
  req.body.password,
  ((err, account) => {
    if (err){
      return next(err);
    }
    log.info('User registered');
    res.redirect('/');
  }));
};

module.exports.loginAdmin = passport.authenticate('local',
    {
      failureRedirect: '/admin/login',
      successRedirect: '/',
    }
);

module.exports.verifyAdmin = (req, res, next) => {
  if (req.user){
    return next();
  }
  res.redirect('/admin/login');
};
