const mongoose = require('mongoose');
const enums = require('../enums');

const Schema = mongoose.Schema;

const MemberSchema = Schema({
  year: {
    type: String,
    enum: Object.values(enums.years),
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  major: String,
  summary: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(enums.roles),
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(enums.status),
  },
  imagePath: String,
});

module.exports = mongoose.model('Member', MemberSchema);
