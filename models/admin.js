const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = Schema({
	username: String,
	passwordHash: String,
});

module.exports = mongoose.model('Admin', AdminSchema);