const isProduction = process.env.NODE_ENV === 'production';
const developmentUrl = 'mongodb+srv://SER320User:etr21HbP7gaHLWkx@thecluster-muogm.mongodb.net/ser320devdb?retryWrites=true';
const productionUrl = 'mongodb+srv://SER320User:etr21HbP7gaHLWkx@thecluster-muogm.mongodb.net/ser320proddb?retryWrites=true';

// Use different databases for production and development
const mongoURL = isProduction ? productionUrl : developmentUrl;

// GET environment variables from .env file if we are not in production
if (!isProduction){
  require('dotenv').config();
}

module.exports = {
  'secretKey': process.env.SESSION_SECRET,
  'mongoURL': mongoURL,
  'adminCode': process.env.ADMIN_CODE,
};
