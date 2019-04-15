// set up
const express = require('express');
const router = express.Router();

// get files
const admin = require('./admin');
const events = require('./events');
const members = require('./members');
const personnel = require('./personnel');
const resources = require('./resources');
const applications = require('./applications');

// send to respoective routers
router.use('/admin', admin);
router.use('/events', events);
router.use('/members', members);
router.use('/personnel', personnel);
router.use('/resources', resources);
router.use('/applications', applications);

// get homepage
router.get('/', (req, res) => {
  res.send('<h1>Home Page</h1>');
});

module.exports = router;
