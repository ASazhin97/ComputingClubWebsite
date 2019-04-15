const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EventSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Event', EventSchema);
