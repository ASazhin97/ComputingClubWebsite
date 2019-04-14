// set up
const express = require('express');
const router = express.Router();

// set up files
const events = require('./events');

// sending to the different routers
router.use('/events', events);

module.exports = router;
