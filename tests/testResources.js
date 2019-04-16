const mongoose = require('mongoose');
const Resource = require('../models/resource');
const config = require('../config');

const connectionURL = config.mongoURL;
mongoose.connect(connectionURL, {
  useNewUrlParser: true,
});

const dbConnection = mongoose.connection;

const categoryEnums = Resource.schema.path('category').enumValues;

dbConnection.on('error', err => {
  console.log(err.message);
});

dbConnection.once('open', () => {
  // Create a resource using the model
  const newResource = new Resource({
    title: 'Basic Git Commands',
    summary: 'Get you going with Git!',
    link: 'https://confluence.atlassian.com/bitbucketserver/basic-git-commands-776639767.html',
    category: categoryEnums[0],
  });
  // Save the resource to the db
  Resource.create(newResource, (err, resource) => {
    if (err) return console.log(err);
    console.log('Resource was saved');
    console.log(resource);
    // Delete the resource
    Resource.findOneAndDelete({
      title: 'Basic Git Commands',
    }, (err, resource) => {
      if (err) return console.log(err.message);
      console.log('Resource was deleted');
      console.log(resource);
    });
    // Close the connection
    dbConnection.close(err => {
      if (err) return console.log(err.message);
    });
  });
});
