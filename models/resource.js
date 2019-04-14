const mongoose = require('mongoose');

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
    enum: ['GIT', 'JAVA', 'SCALA', 'ANDROID', 'HTML'],
    required: true,
  },
});

module.exports = mongoose.model('Resource', ResourceSchema);
