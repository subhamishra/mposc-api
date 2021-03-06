var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var appointmentRouter = require('./routes/appointment');
var lookupRouter = require('./routes/lookup');
var videoRouter = require('./routes/videos');
var questionRouter = require('./routes/question');
var appUserActivityRouter = require('./routes/appUserActivity');
var cartRouter = require('./routes/cart');
var chatRoomRouter = require('./routes/chatRoom');
var contactRouter = require('./routes/caseContact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// allow CORS req
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/appointments', appointmentRouter);
app.use('/lookup', lookupRouter);
app.use('/videos', videoRouter);
app.use('/questions', questionRouter);
app.use('/appUserActivity', appUserActivityRouter);
app.use('/cart', cartRouter);
app.use('/chat', chatRoomRouter);
app.use('/contact', contactRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
