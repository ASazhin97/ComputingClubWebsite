const mongoose = require('mongoose');
const Application = require('../models/application');
const config = require('../config');

const connectionURL = config.mongoURL;
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
});

const dbConnection = mongoose.connection;

dbConnection.on('error', err => {
  console.log(err.message);
});

dbConnection.once('open', () => {
  // Create an application using the model
  const newApplication = new Application({
    firstName: 'Jane',
    lastName: 'Doe',
    major: 'Industrial Engineering',
    summary: 'Can\'t wait to get into the engineering industry!',
    status: 'PENDING',
  });
  // Save the application to the db
  Application.create(newApplication, (err, application) => {
    if (err) return console.log(err);
    console.log('Application was saved');
    console.log(application);
    // Delete the application
    Application.findOneAndDelete({
      firstName: 'Jane',
    }, (err, application) => {
      if (err) return console.log(err.message);
      console.log('Application was deleted');
      console.log(application);
    });
    // Close the connection
    dbConnection.close(err => {
      if (err) return console.log(err.message);
    });
  });
});
