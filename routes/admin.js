const express = require('express');
const auth = require('./auth');
const router = express.Router();


router.route('/register')
    .get((req, res) => {
      res.send('<h1>Admin Register GET</h1>');
    })
    .post((req, res, next) => {
      auth.registerAdmin(req, res, next);
    });

router.route('/login')
    .get((req, res) => {
      res.send('<h1>Admin Login GET</h1>');
    })
    .post(auth.loginAdmin);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
