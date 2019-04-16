const express = require('express');
const auth = require('./auth');
const Event = require('../models/event');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

// GET /events
// Returns all events
router.get('/', (req, res, next) => {
  Event.find({}, (err, events) => {
    if (err){
      return next(err);
    }
    res.json(events);
  });
});

// POST /events
// Creates one event
router.post((req, res, next) => {
  // Create an event using the model
  const newEvent = new Event(req.body.event);
  // Save the event
  Event.create(newEvent, (err, event) => {
    if (err){
      return next(err);
    }
    res.json(event);
  });
});

// TODO: Admin only routes. (Should GET be admin only?)
// GET/PUT/DELETE /events/:id
// Returns/Updates/Deletes one event by the event's id
router.route('/:id')
    .all(verifyAdmin)
    .get((req, res, next) => {
      Event.findById(req.params.id, (err, events) => {
        if (err){
          return next(err);
        }
        res.json(events);
      });
    })
    .put((req, res, next) => {
      Event.findByIdAndUpdate(req.params.id, (err, event) => {
        if (err){
          return next(err);
        }
        res.json(event);
      });
    })
    .delete((req, res, next) => {
      Event.findByIdAndDelete(req.params.id, (err, event) => {
        if (err){
          return next(err);
        }
        res.json(event);
      });
    });

module.exports = router;
