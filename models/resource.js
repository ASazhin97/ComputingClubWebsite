const mongoose = require('mongoose');
const faker = require('@lykmapipo/mongoose-faker');
const enums = require('../enums');

const Schema = mongoose.Schema;

const ResourceSchema = Schema({
  title: {
    type: String,
    required: true,
    fake: {
      generator: 'lorem',
      type: 'word',
    },
  },
  summary: {
    type: String,
    required: true,
    fake: {
      generator: 'lorem',
      type: 'paragraph',
    },
  },
  link: {
    type: String,
    required: true,
    fake: {
      generator: 'internet',
      type: 'url',
    },
  },
  category: {
    type: String,
    enum: Object.values(enums.categories),
    required: true,
    default: () => {
      const categories = Object.values(enums.categories);
      const randIndex = Math.floor(Math.random()*categories.length);
      return categories[randIndex];
    },
  },
});

ResourceSchema.plugin(faker);

module.exports = mongoose.model('Resource', ResourceSchema);
