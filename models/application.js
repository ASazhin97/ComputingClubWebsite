const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ApplicationSchema = Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	major: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('Application', ApplicationSchema);