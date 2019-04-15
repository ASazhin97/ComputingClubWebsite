const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

router.get('/', verifyAdmin, (req, res) => {
  res.send('<h1>Applications Page</h1>');
});

router.route('/:id')
    .get(verifyAdmin, (req, res) => {
      res.send('<h1>Applications Page: GET ID</h1>');
    })
    .post((req, res) => {
      res.send('<h1>Applications Page: POST ID</h1>');
    })
    .put(verifyAdmin, (req, res) => {
      res.send('<h1>Applications Page: PUT ID</h1>');
    })
    .delete(verifyAdmin, (req, res) => {
      res.send('<h1>Applications Page: DELETE ID</h1>');
    });

module.exports = router;
