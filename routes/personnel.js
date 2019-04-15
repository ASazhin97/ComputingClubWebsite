const express = require('express');
const auth = require('./auth');
const Resource = require('../models/user');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

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
      Resource.find({}, (err, resources) => {
        if (err){
          return next(err);
        }
        res.json(resources);
      });
    })
    .post(verifyAdmin, (req, res) => {
    // creating one new user
    // const newResource = new Resource(req.body.resource);
      const newResource = new Resource({
        year: req.body.title,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        major: req.body.major,
        type: req.body.type,
        status: req.body.status,
        imagePath: req.body.imagePath,
      });

      // save
      Resource.create(newResource, (err, resources) => {
        if (err){
          return next(err);
        }
        res.json(resources);
      });
    })
    .put(verifyAdmin, (req, res) => {
      Resource.findByIdAndUpdate(
          req.params.id,
          req.body.resource,
          (err, resource) => {
            if (err){
              return next(err);
            }
            res.json(resource);
          }
      );
    })
    .delete(verifyAdmin, (req, res) => {
      Resource.findByIdAndDelete(req.params.id, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
    });

module.exports = router;
