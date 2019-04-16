const express = require('express');
const auth = require('./auth');
const Resource = require('../models/user');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

// Admin only routes
router.all(verifyAdmin);

router.get('/', (req, res, next) => {
  Resource.find({}, (err, resources) => {
    if (err){
      return next(err);
    }
    res.json(resources);
  });
});

router
    .route('/:id')
    .get((req, res, next) => {
    // dont think we need an ID based get for members
      res.send('<h1>Members Page: GET ID</h1>');
    })
    .post((req, res, next) => {
      const newResource = new Resource({
        year: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        major: req.body.major,
        type: req.body.type,
        status: req.body.status,
        imagePath: req.body.imagePath,
      });

      Resource.create(newResource, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
    })
    .put((req, res, next) => {
      Resource.findByIdAndUpdate(
          req.params.is,
          req.body.resource,
          (err, resource) => {
            if (err){
              return next(err);
            }
            res.json(resource);
          }
      );
    })
    .delete((req, res) => {
      Resource.findByIdAndDelete(req.params.id, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
    });

module.exports = router;
