const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const Schema = mongoose.Schema;

const AdminSchema = Schema({
  username: {
    type: String,
    required: true,
  },
});

AdminSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Admin', AdminSchema);
