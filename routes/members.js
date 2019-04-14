const express = require('express');
const router = express.Router();
const auth = require('./auth');
const verifyAdmin = auth.verifyAdmin;

// Admin only routes
router.use(verifyAdmin);

router.get('/', (req, res) => {
  res.send('<h1>Members Page</h1>');
});

router.route('/:id')
    .get((req, res) => {
      res.send('<h1>Members Page: GET ID</h1>');
    })
    .post((req, res) => {
      res.send('<h1>Members Page: POST ID</h1>');
    })
    .put((req, res) => {
      res.send('<h1>Members Page: PUT ID</h1>');
    })
    .delete((req, res) => {
      res.send('<h1>Members Page: DELETE ID</h1>');
    });

module.exports = router;
