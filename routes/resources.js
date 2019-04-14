const express = require('express');
const auth = require('./auth');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

router.get('/', (req, res) => {
  res.send('<h1>Resources Page</h1>');
});

// TODO: Do validation to ensure category is valid. Use enums from model
router.get('/category/:name', (req, res) => {
  res.send(`<h1>Resources Page: Category is ${req.params.name}</h1>`);
});

// TODO: Admin only routes. (Should GET be admin only?)
router.route('/:id')
    .all(verifyAdmin)
    .get((req, res) => {
      res.send('<h1>Resources Page: GET ID</h1>');
    })
    .post((req, res) => {
      res.send('<h1>Resources Page: POST ID</h1>');
    })
    .put((req, res) => {
      res.send('<h1>Resources Page: PUT ID</h1>');
    })
    .delete((req, res) => {
      res.send('<h1>Resources Page: DELETE ID</h1>');
    });

module.exports = router;
