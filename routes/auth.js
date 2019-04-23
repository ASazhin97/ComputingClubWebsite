const Admin = require('../models/admin');
const passport = require('passport');
const log = require('loglevel');
const jwt = require('jsonwebtoken');
const config = require('../config');


module.exports.getToken = callback => {
  jwt.sign({admin: true}, config.secretKey, (err, token) => {
    if (err){
      callback(err, null);
    }
    log.info('Token generated');
    callback(null, token);
  });
};
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
    this.getToken((err, token) => {
      if (err){
        next(err);
      }
      res.cookie('token', token, {httpOnly: true});
      res.json('Registration successful');
    });
  }));
};

// TODO: Implement connect-flash to show success/failure messages
module.exports.loginAdmin = (req, res, next) => {
  passport.authenticate('local', {session: false},
      (err, user, info) => {
        if (err){
          next(err);
        }
        if (!user){
          return res.redirect('/admin/login');
        }
        this.getToken((err, token) => {
          if (err){
            next(err);
          }
          res.cookie('token', token, {httpOnly: true});
          res.json('Login successful');
        });
      })(req, res, next);
};

// See: http://www.passportjs.org/docs/configure/#sessions
// See: https://logrocket.com/blog/jwt-authentication-best-practices
// JWT is not useful for this application since it has to be sent with every
// request and the server has to parse it which takes up a lot of resources
// as the # of users grow versus using sessions
module.exports.verifyAdmin = (req, res, next) => {
  const token = req.cookies.token;
  const authErr = new Error('Not authorized');
  authErr.status = 401;
  if (token){
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err){
        next(err);
      }
      if (decoded.admin){
        next();
      } else {
        next(authErr);
      }
    });
  } else {
    next(authErr);
  }
};
