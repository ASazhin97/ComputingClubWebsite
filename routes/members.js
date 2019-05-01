const express = require('express');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, '../client/images');
  },
  filename: function(req, file, cb){
    cb(null, `${req.body.member._id}`);
  },
});

const upload = multer({storage: storage});

const auth = require('./auth');
const Member = require('../models/member');
const enums = require('../enums');
const router = express.Router();
const verifyAdmin = auth.verifyAdmin;

// GET /members
// Returns all members except applicants
router.get('/', (req, res, next) => {
  Member.find({role: {$ne: enums.roles.APPLICANT}}, (err, members) => {
    if (err){
      return next(err);
    }
    res.json(members);
  });
});

// POST /members
// Creates one member
router.post('/', upload.single('avatar'), (req, res, next) => {
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

// TODO: Do validation to ensure role is valid.
// GET /members/role/:role
// Returns all members that have the role passed by the param
router.get('/role/:role', (req, res, next) => {
  // Only admins can see applicants
  const isAuthenticated = req.user ? true : false;
  if (!isAuthenticated && req.params.role === enums.roles.APPLICANT){
    const err = new Error('Not authorized');
    err.status = 401;
    return next(err);
  }
  Member.find({role: req.params.role}, (err, members) => {
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
      Member.findByIdAndUpdate(req.params.id, req.body.member,
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
