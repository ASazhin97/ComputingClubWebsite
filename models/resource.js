const mongoose = require('mongoose');
const enums = require('../enums');

const Schema = mongoose.Schema;

const ResourceSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: Object.values(enums.categories),
    required: true,
  },
});

module.exports = mongoose.model('Resource', ResourceSchema);
