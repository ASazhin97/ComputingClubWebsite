const mongoose = require('mongoose');
const User = require('../models/user');

let connectionURL = 'mongodb+srv://iSolution:VKGODmMbst6tfXe9@thecluster-muogm.mongodb.net/test?retryWrites=true';
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
	let newUser = new User({
		year: yearEnums[0],
		firstName: 'John',
		lastName: 'Doe',
		major: 'Business',
		summary: 'Hi I\'m John the business major',
		type: typeEnums[0],
	});
	User.create(newUser, (err, user) => {
		if (err) return console.err(err);
		console.log('User was saved');
		console.log(user);
	});
});