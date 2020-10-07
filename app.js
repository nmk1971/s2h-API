const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cors = require('cors');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const quizzesRouter = require('./routes/quizzes');
const quizSessionsRouter = require('./routes/quiz-sessions');
const questionsRouter = require('./routes/questions');
const groupsRouter = require('./routes/group');


const app = express();
app.use(cors());

app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', indexRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/quizzes', quizzesRouter);
app.use('/api/v1/questions', questionsRouter);
app.use('/api/v1/quiz-sessions',quizSessionsRouter);
app.use('/api/v1/groups',groupsRouter);
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error 
  res.status(err.status || 500);
  res.json({
    error: 'error server code:500'
  });
});

module.exports = app;
