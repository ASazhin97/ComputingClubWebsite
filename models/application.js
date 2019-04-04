const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApplicationSchema = Schema({
	firstName: String,
	lastName: String,
	major: String,
	summary: String,
	status: String
});

module.exports = mongoose.model('Application', ApplicationSchema);