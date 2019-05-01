const mongoose = require('mongoose');
const faker = require('@lykmapipo/mongoose-faker');
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
    fake: {
      generator: 'name',
      type: 'firstName',
    },
  },
  lastName: {
    type: String,
    required: true,
    fake: {
      generator: 'name',
      type: 'lastName',
    },
  },
  major: String,
  summary: {
    type: String,
    required: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph',
    },
  },
  role: {
    type: String,
    enum: Object.values(enums.roles),
    required: true,
    default: () => {
      const roles = Object.values(enums.roles);
      const randIndex = Math.floor(Math.random() * roles.length);
      return roles[randIndex];
    },
  },
  imagePath: String,
});

MemberSchema.plugin(faker);

module.exports = mongoose.model('Member', MemberSchema);
