const express = require('express');
const auth = require('./auth');
const Resource = require('../models/resource');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

// const categoryEnums = Resource.schema.path('category').enumValues;

// GET /resources
// Returns all resources
router.get('/', (req, res, next) => {
  Resource.find({}, (err, resources) => {
    if (err){
      return next(err);
    }
    res.json(resources);
  });
});

// POST /resources
// Creates one resource
router.post('/', (req, res, next) => {
  // Create a resource using the model
  const newResource = new Resource(req.body.resource);
  // Save the resource
  Resource.create(newResource, (err, resource) => {
    if (err){
      return next(err);
    }
    res.json(resource);
  });
});

// TODO: Do validation to ensure category is valid. Use enums from model
// GET /resources/category/:name
// Returns all resources that have the category passed by the param
router.get('/category/:name', (req, res, next) => {
  Resource.find({category: req.params.name}, (err, resources) => {
    if (err){
      return next(err);
    }
    res.json(resources);
  });
});

// GET/PUT/DELETE /resources/:id
// Returns/Updates/Deletes one resource by the resource's id
router.route('/:id')
    .get((req, res, next) => {
      Resource.findById(req.params.id, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
    })
    .put(verifyAdmin, (req, res, next) => {
      Resource.findByIdAndUpdate(req.params.id, req.body.resource,
          (err, resource) => {
            if (err){
              return next(err);
            }
            res.json(resource);
          }
      );
    })
    .delete(verifyAdmin, (req, res, next) => {
      Resource.findByIdAndDelete(req.params.id, (err, resource) => {
        if (err){
          return next(err);
        }
        res.json(resource);
      });
    });

module.exports = router;
