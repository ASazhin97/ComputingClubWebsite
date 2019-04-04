const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = Schema({
	year: Number,
	firstName: String,
	lastName: String,
	major: String,
	summary: String,
	type: {
		type: String,
		enum: ['MEMBER', 'OFFICER', 'APPLICANT', 'PROFESSOR']
	},
	status: {
		type: String,
		enum: ['PENDING', 'APPROVED', 'DECLINED']
	},
	imagePath: String
});

module.exports = mongoose.model('User', UserSchema);