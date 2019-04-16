const express = require('express');
const auth = require('./auth');
const Application = require('../models/application');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

// All routes are admin only
router.use(verifyAdmin);

// GET /applications
// Returns all applications
router.get('/', (req, res, next) => {
  Application.find({}, (err, applications) => {
    if (err){
      return next(err);
    }
    res.json(applications);
  });
});

// GET /PUT/DELETE /applications/:id
// Returns/Updates/Deletes one application by the application's id
router.route('/:id')
    .get((req, res, next) => {
      Application.findById(req.params.id, (err, application) => {
        if (err){
          return next(err);
        }
        res.json(application);
      });
    })
    .post((req, res, next) => {
      // Create an application using the model
      const newApplication = new Application(req.body.application);
      // Save the application
      Application.create(newApplication, (err, application) => {
        if (err){
          return next(err);
        }
        res.json(application);
      });
    })
    .put((req, res, next) => {
      Application.findByIdAndUpdate(req.params.id, req.body.application,
          (err, application) => {
            if (err){
              return next(err);
            }
            res.json(application);
          }
      );
    })
    .delete((req, res, next) => {
      Application.findByIdAndDelete(req.params.id, (err, application) => {
        if (err){
          return next(err);
        }
        res.json(application);
      });
    });

module.exports = router;
