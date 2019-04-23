const express = require('express');
const router = express.Router();
const admin = require('./admin');
const events = require('./events');
const members = require('./members');
const resources = require('./resources');

router.use('/admin', admin);
router.use('/events', events);
router.use('/members', members);
router.use('/resources', resources);

router.get('/', (req, res) => {
  res.sendFile(`${__dirname}/logout.html`);
});

module.exports = router;
