const express = require('express');
const auth = require('./auth');
const Resource = require('../models/user');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

router.get('/', verifyAdmin, (req, res, next) => {
  Resource.find({}, (err, resources) => {
    if (err){
      return next(err);
    }
    res.json(resources);
  });
});

router
    .route('/:id')
    .all(verifyAdmin)
    .get((req, res, next) => {
      Resource.findById(req.params.id, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
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

      // save
      Resource.create(newResource, (err, resources, next) => {
        if (err){
          return next(err);
        }
        res.json(resources);
      });
    })
    .put((req, res, next) => {
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
    .delete((req, res, next) => {
      Resource.findByIdAndDelete(req.params.id, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
    });

module.exports = router;
