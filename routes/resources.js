const express = require('express');
const auth = require('./auth');
const Resource = require('../models/resource');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

// const categoryEnums = Resource.schema.path('category').enumValues;

router.get('/', (req, res, next) => {
  Resource.find({}, (err, resources) => {
    if (err){
      return next(err);
    }
    res.json(resources);
  });
});

router.post('/', (req, res, next) => {
  // Create a resource using the model
  const newResource = new Resource({
    title: req.body.title,
    summary: req.body.summary,
    link: req.body.link,
    category: req.body.category,
  });
  // Save the resource to the db
  Resource.create(newResource, (err, resource) => {
    if (err) return next(err);
    console.log('Resource was saved');
    res.json(resource);
  });
});

// TODO: Do validation to ensure category is valid. Use enums from model
router.get('/category/:name', (req, res, next) => {
  Resource.find({category: req.params.name}, (err, resources) => {
    if (err){
      return next(err);
    }
    res.json(resources);
  });
});

// TODO: Admin only routes. (Should GET be admin only?)
router.route('/:id')
    .all(verifyAdmin)
    .get((req, res, next) => {
      Resource.findById(req.params.id, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
    })
    .put((req, res, next) => {
      Resource.findByIdAndUpdate(req.params.id, req.body.resource,
          (err, resource) => {
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
