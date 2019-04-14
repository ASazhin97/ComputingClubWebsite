// general set up
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

// set up with files
const index = require('./routes/index');
const Admin = require('./models/admin');
const config = require('./config');

// port
const port = 3000;

// set up app
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(
    session({
      secret: config.secretKey,
      resave: false,
      saveUninitialized: false,
    })
);
// authentication stuff
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// connect to mongoose
mongoose.connect(config.mongoURL, {
  useNewUrlParser: true,
});

// error handeling for mongo db
const dbConnection = mongoose.connection;
dbConnection.on(
    'error',
    console.error.bind(console, 'MongoDB connection error:')
);
dbConnection.once('open', () => {
  console.log('Connected to Database');
});

// this doesnt do anything more formaking sure everything works
app.use((req, res, next) => {
  console.log(req.user);
  next();
});

// directs everything to go trhought the index route
app.use('/', index);

// Catch 404 errors
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error Handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {},
  });
});

// start the listening on the port
app.listen(port, () => {
  console.log(`Sever started on ${port}`);
});
