const express = require('express');
const auth = require('./auth');
const router = express.Router();

// GET/POST /admin/register
router.route('/register')
// Sends registration page
    .get((req, res) => {
      res.sendFile(`${__dirname}/register.html`);
    })
// Creates a new admin user
    .post((req, res, next) => {
      auth.registerAdmin(req, res, next);
    });

// GET/POST /admin/login
router.route('/login')
// Sends login page
    .get((req, res) => {
      res.sendFile(`${__dirname}/login.html`);
    })
// Authenticate admin user
    .post((req, res, next) => {
      auth.loginAdmin(req, res, next);
    });

// POST /admin/logout
// Logout admin user
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;
