const express = require('express');
const auth = require('./auth');
const router = express.Router();

// POST /admin/register
router.route('/register')
// Creates a new admin user
    .post((req, res, next) => {
      auth.registerAdmin(req, res, next);
    });

// POST /admin/login
router.route('/login')
// Authenticate admin user
    .post((req, res, next) => {
      auth.loginAdmin(req, res, next);
    });

// POST /admin/logout
// Logout admin user
router.post('/logout', (req, res) => {
  req.logout();
  res.json('Logout Successful');
});

module.exports = router;
