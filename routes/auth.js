const Admin = require('../models/admin');
const passport = require('passport');
const log = require('loglevel');

module.exports.registerAdmin = (req, res, next) => {
  log.info('Registering user');
  Admin.register(new Admin({
    username: req.body.username,
  }),
  req.body.password, ((err, account) => {
    if (err){
      return next(err);
    }
    log.info('User registered');
    req.login(account, err => {
      if (err){
        return next(err);
      }
      log.info('User was logged in');
      res.json('Registration successful');
    });
  }));
};

// TODO: Implement connect-flash to show success/failure messages
module.exports.loginAdmin = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err){
      return next(err);
    }
    if (!user){
      const err = new Error('Login Failed');
      err.status = 401;
      return next(err);
    }
    req.login(user, err => {
      if (err){
        return next(err);
      }
      return res.json('Login Successful');
    });
  })(req, res, next);
};

// See: http://www.passportjs.org/docs/configure/#sessions
// See: https://logrocket.com/blog/jwt-authentication-best-practices
// JWT is not useful for this application since it has to be sent with every
// request and the server has to parse it which takes up a lot of resources
// as the # of users grow versus using sessions
module.exports.verifyAdmin = (req, res, next) => {
  if (req.user){
    return next();
  }
  const err = new Error('Not authorized');
  err.status = 401;
  next(err);
};
