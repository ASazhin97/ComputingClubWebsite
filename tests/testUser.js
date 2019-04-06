const mongoose = require('mongoose');
const User = require('../models/user');

let connectionURL = 'mongodb+srv://SER320User:etr21HbP7gaHLWkx@thecluster-muogm.mongodb.net/ser320db?retryWrites=true';
mongoose.connect(connectionURL, {
	useNewUrlParser: true
});

let dbConnection = mongoose.connection;

let yearEnums = User.schema.path('year').enumValues;
let typeEnums = User.schema.path('type').enumValues;

dbConnection.on('error', (err) => {
	console.log(err.message);
});

dbConnection.once('open', () => {
	// Create a user using the model
	let newUser = new User({
		year: yearEnums[0],
		firstName: 'John',
		lastName: 'Doe',
		major: 'Business',
		summary: 'Hi I\'m John the business major',
		type: typeEnums[0]
	});
	// Save the user to the db
	User.create(newUser, (err, user) => {
		if (err) return console.log(err);
		console.log('User was saved');
		console.log(user);
		// Delete the user
		User.findOneAndDelete({
			firstName: 'John'
		}, (err, user) => {
			if (err) return console.log(err.message);
			console.log('User was deleted');
			console.log(user);
		});
		// Close the connection
		dbConnection.close((err) => {
			if (err) return console.log(err.message);
		});
	});
});