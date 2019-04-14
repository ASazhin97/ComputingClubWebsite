const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

router.get('/', (req, res) => {
  res.send('<h1>Personnel Page</h1>');
});

router.route('/:id')
    .get((req, res) => {
      res.send('<h1>Personnel Page: GET ID</h1>');
    })
    .post(verifyAdmin, (req, res) => {
      res.send('<h1>Personnel Page: POST ID</h1>');
    })
    .put(verifyAdmin, (req, res) => {
      res.send('<h1>Personnel Page: PUT ID</h1>');
    })
    .delete(verifyAdmin, (req, res) => {
      res.send('<h1>Personnel Page: DELETE ID</h1>');
    });

module.exports = router;
