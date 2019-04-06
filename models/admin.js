const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AdminSchema = Schema({
	username: {
		type: String,
		required: true
	},
	passwordHash: {
		type: String,
		required: true
	},
});

module.exports = mongoose.model('Admin', AdminSchema);