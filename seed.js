const mongoose = require('mongoose');
const Event = require('./models/event');
const Member = require('./models/member');
const Resource = require('./models/resource');


const config = require('./config');

const connectionURL = config.mongoURL;
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
});

const dbConnection = mongoose.connection;

dbConnection.on('error', err => {
  console.log(err.message);
});

dbConnection.once('open', () => {
  seedEvents(10);
  seedMembers(20);
  seedResources(10);
  // deleteDatabase();
});

function seedEvents(size){
  const fakeEvents = Event.fake(size);
  Event.create(fakeEvents, (err, events) => {
    if (err){
      return console.log(err);
    }
    console.log('Events was seeded');
  });
}

function seedMembers(size){
  const fakeMembers = Member.fake(size);
  Member.create(fakeMembers, (err, members) => {
    if (err){
      return console.log(err);
    }
    console.log('Members was seeded');
  });
}

function seedResources(size){
  const fakeResources = Resource.fake(size);
  Resource.create(fakeResources, (err, resources) => {
    if (err){
      return console.log(err);
    }
    console.log('Resources was seeded');
  });
}

function deleteDatabase(){
  dbConnection.dropDatabase(err => {
    if (err){
      return console.log(err);
    }
    console.log('Database dropped');
  });
}

function closeConnection(){
  dbConnection.close(err => {
    if (err){
      return console.log(err.message);
    }
    console.log('Connection closed');
  });
}
