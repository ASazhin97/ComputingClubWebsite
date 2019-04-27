const mongoose = require('mongoose');
const faker = require('@lykmapipo/mongoose-faker');

const Schema = mongoose.Schema;

const EventSchema = Schema({
  name: {
    type: String,
    required: true,
    fake: {
      generator: 'name',
      type: 'findName',
    },
  },
  date: {
    type: Date,
    required: true,
    fake: {
      generator: 'date',
      type: 'future',
    },
  },
  time: {
    type: String,
    required: false,
    default: () => {
      // Generate a random time between 9am and 10pm in military time
      // Will be removed and time will be parsed from date client side
      const hour = (Math.floor(Math.random() * 13) + 9).toString();
      const minutes = (Math.floor(Math.random() * 59) + 0).toString();
      return `${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
    },
  },
  description: {
    type: String,
    required: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph',
    },
  },
});

EventSchema.plugin(faker);

module.exports = mongoose.model('Event', EventSchema);
