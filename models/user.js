const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = Schema({
	year: {
		type: String,
		enum: ['FRESHMAN', 'SOPHOMORE', 'JUNIOR', 'SENIOR']
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	major: String,
	summary: {
		type: String,
		required: true
	},
	type: {
		type: String,
		enum: ['MEMBER', 'OFFICER', 'APPLICANT', 'PROFESSOR'],
		required: true
	},
	status: {
		type: String,
		enum: ['PENDING', 'APPROVED', 'DECLINED']
	},
	imagePath: String
});

module.exports = mongoose.model('User', UserSchema);