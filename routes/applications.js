const express = require('express');
const router = express.Router();

const verifyAdmin = (req, res, next) => {
  res.append('Admin', 'YES');
  next();
};

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
