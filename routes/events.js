const express = require('express');
const auth = require('./auth');
const Resource = require('../models/event');
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

// TODO: Admin only routes. (Should GET be admin only?)
router
    .route('/:id')
    .all(verifyAdmin)
    .get((req, res, next) => {
      Resource.findById(req.params.id, (err, resources) => {
        if (err){
          return next(err);
        }
        res.json(resources);
      });
    })
    .post((req, res, next) => {
      const newResource = new Resource({
        name: req.body.name,
        date: req.body.date,
        time: req.body.time,
        summary: req.body.summary,
      });

      Resource.create(newResource, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
    })
    .put((req, res, next) => {
      Resource.findByIdAndUpdate(req.params.id, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
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
