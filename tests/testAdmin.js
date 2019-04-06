const mongoose = require('mongoose');
const Admin = require('../models/admin');

let connectionURL = 'mongodb+srv://SER320User:etr21HbP7gaHLWkx@thecluster-muogm.mongodb.net/ser320db?retryWrites=true';
mongoose.connect(connectionURL, {
	useNewUrlParser: true
});

let dbConnection = mongoose.connection;

dbConnection.on('error', (err) => {
	console.log(err.message);
});

dbConnection.once('open', () => {
	// Create an admin using the model
	let newAdmin = new Admin({
		username: 'jjdoe',
		passwordHash: 'Password123'
	});
	// Save the admin to the db
	Admin.create(newAdmin, (err, admin) => {
		if (err) return console.log(err);
		console.log('Admin was saved');
		console.log(admin);
		// Delete the admin
		Admin.findOneAndDelete({
			username: 'jjdoe'
		}, (err, admin) => {
			if (err) return console.log(err.message);
			console.log('Admin was deleted');
			console.log(admin);
		});
		// Close the connection
		dbConnection.close((err) => {
			if (err) return console.log(err.message);
		});
	});
});