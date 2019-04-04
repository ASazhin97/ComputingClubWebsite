const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const EventSchema = Schema({
	name: String,
	date: Date,
	time: String,
	summary: String
});

module.exports = mongoose.model('Event', EventSchema);