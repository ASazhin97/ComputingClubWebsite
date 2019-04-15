const mongoose = require('mongoose');
const Event = require('../models/event');

const connectionURL = 'mongodb+srv://SER320User:etr21HbP7gaHLWkx@thecluster-muogm.mongodb.net/ser320db?retryWrites=true';
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
});

const dbConnection = mongoose.connection;

dbConnection.on('error', err => {
  console.log(err.message);
});

dbConnection.once('open', () => {
  // Create an event using the model
  const newEvent = new Event({
    name: 'Hackathon Spring 2019',
    date: new Date('April 6, 2019 09:30:00'),
    time: '9:30AM - 6:30PM',
    summary: 'Rapid software development session!',
  });
  // Save the event to the db
  Event.create(newEvent, (err, event) => {
    if (err) return console.log(err);
    console.log('Event was saved');
    console.log(event);
    // Delete the event
    Event.findOneAndDelete({
      name: 'Hackathon Spring 2019',
    }, (err, event) => {
      if (err) return console.log(err.message);
      console.log('Event was deleted');
      console.log(event);
    });
    // Close the connection
    dbConnection.close(err => {
      if (err) return console.log(err.message);
    });
  });
});
