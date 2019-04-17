const express = require('express');
const auth = require('./auth');
const Member = require('../models/member');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

// All routes are admin only
router.use(verifyAdmin);

// GET /applications
// Returns all applications
router.get('/', (req, res, next) => {
  Member.find({type: 'APPLICANT'}, (err, applications) => {
    if (err){
      return next(err);
    }
    res.json(applications);
  });
});

// POST /applications
// Creates one application
router.post('/', (req, res, next) => {
  // Create an application using the model
  const newApplication = new Member(req.body.application);
  // Save the application
  Member.create(newApplication, (err, application) => {
    if (err){
      return next(err);
    }
    res.json(application);
  });
});

// GET/PUT/DELETE /applications/:id
// Returns/Updates/Deletes one application by the application's id
router.route('/:id')
    .get((req, res, next) => {
      Member.findById(req.params.id, (err, application) => {
        if (err){
          return next(err);
        }
        res.json(application);
      });
    })
    .put((req, res, next) => {
      Member.findByIdAndUpdate(req.params.id, req.body.application,
          (err, application) => {
            if (err){
              return next(err);
            }
            res.json(application);
          }
      );
    })
    .delete((req, res, next) => {
      Member.findByIdAndDelete(req.params.id, (err, application) => {
        if (err){
          return next(err);
        }
        res.json(application);
      });
    });

module.exports = router;
