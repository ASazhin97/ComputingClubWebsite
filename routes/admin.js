const express = require('express');
const auth = require('./auth');
const router = express.Router();

// GET/POST /admin/register
router.route('/register')
// Sends registration page
    .get((req, res) => {
      res.send('<h1>Admin Register GET</h1>');
    })
// Creates a new admin user
    .post((req, res, next) => {
      auth.registerAdmin(req, res, next);
    });

// GET/POST /admin/login
router.route('/login')
// Sends login page
    .get((req, res) => {
      res.send('<h1>Admin Login GET</h1>');
    })
// Authenticate admin user
    .post(auth.loginAdmin);

// POST /admin/logout
// Logout admin user
router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
