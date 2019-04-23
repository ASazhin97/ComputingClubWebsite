const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const log = require('loglevel');
const chalk = require('chalk');
const prefix = require('loglevel-plugin-prefix');
const cookieParser = require('cookie-parser');

const index = require('./routes/index');
const Admin = require('./models/admin');
const config = require('./config');

const app = express();
const port = 3000;

const colors = {
  TRACE: chalk.magenta,
  DEBUG: chalk.cyan,
  INFO: chalk.blue,
  WARN: chalk.yellow,
  ERROR: chalk.red,
};
log.setDefaultLevel(1);
prefix.reg(log);
prefix.apply(log, {
  format(level, name, timestamp){
    const chalkTimestap = chalk.gray(`[${timestamp}]`);
    return `${chalkTimestap} ${colors[level.toUpperCase()](level)}:`;
  },
});
prefix.apply(log.getLogger('critical'), {
  format(level, name, timestamp){
    return chalk.red.bold(`[${timestamp}] ${level} ${name}:`);
  },
});

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(passport.initialize());


passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

mongoose.connect(config.mongoURL, {
  useNewUrlParser: true,
});

const dbConnection = mongoose.connection;
dbConnection.on('error', err => {
  log.error('MongoDB connection error:');
});
dbConnection.once('open', () => {
  log.info('Connected to Database');
});

app.use('/', index);

// Catch 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  // log.trace(err);
  log.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

app.listen(port, () => {
  log.info(`Sever started on ${port}`);
});
