const express = require('express');
const auth = require('./auth');
const Member = require('../models/member');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

// GET /members
// Returns all members
router.get('/', (req, res, next) => {
  Member.find({}, (err, members) => {
    if (err){
      return next(err);
    }
    res.json(members);
  });
});

// POST /members
// Creates one member
router.post(verifyAdmin, (req, res, next) => {
  // Create a member using the model
  const newMember = new Member(req.body.member);
  // Save the member
  Member.create(newMember, (err, member) => {
    if (err){
      return next(err);
    }
    res.json(member);
  });
});

// TODO: Do validation to ensure role is valid. Use enums from model(exclude:
// applicants)
// GET /members/role/:role
// Returns all members that have the role passed by the param
router.get('/role/:role', (req, res, next) => {
  Member.find({type: req.params.role}, (err, members) => {
    if (err){
      return next(err);
    }
    res.json(members);
  });
});

// GET/PUT/DELETE /members/:id
// Returns/Updates/Deletes one member by the member's id
router.route('/:id')
    .get((req, res, next) => {
      Member.findById(req.params.id, (err, member) => {
        if (err){
          return next(err);
        }
        res.json(member);
      });
    })
    .put(verifyAdmin, (req, res, next) => {
      Member.findByIdAndUpdate(req.params.is, req.body.member,
          (err, member) => {
            if (err){
              return next(err);
            }
            res.json(member);
          }
      );
    })
    .delete(verifyAdmin, (req, res, next) => {
      Member.findByIdAndDelete(req.params.id, (err, member) => {
        if (err){
          return next(err);
        }
        res.json(member);
      });
    });

module.exports = router;
