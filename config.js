if (process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

module.exports = {
  'secretKey': process.env.SESSION_SECRET,
  'mongoURL': 'mongodb+srv://SER320User:etr21HbP7gaHLWkx@thecluster-muogm.mongodb.net/ser320db?retryWrites=true',
};
