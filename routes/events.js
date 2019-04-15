const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

router.get('/', (req, res) => {
  res.send('<h1>Events Page</h1>');
});

// TODO: Admin only routes. (Should GET be admin only?)
router.route('/:id')
    .all(verifyAdmin)
    .get((req, res) => {
      res.send('<h1>Events Page: GET ID</h1>');
    })
    .post((req, res) => {
      res.send('<h1>Events Page: POST ID</h1>');
    })
    .put((req, res) => {
      res.send('<h1>Events Page: PUT ID</h1>');
    })
    .delete((req, res) => {
      res.send('<h1>Events Page: DELETE ID</h1>');
    });

module.exports = router;
