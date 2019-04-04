const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ResourceSchema = Schema({
	title: String,
	summary: String,
	link: String,
	category: {
		type: String,
		enum: []
	}
});

module.exports = mongoose.model('Resource', ResourceSchema);