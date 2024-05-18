const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');


//Connect to mongoDB
mongoose.set("strictQuery", false)
const mongoDB = 'mongodb+srv://obre:adminobre@cluster0.vo8ijwg.mongodb.net/local_library?retryWrites=true&w=majority&appName=Cluster0'

main().catch(err => console.log(err))
async function main (){
  await mongoose.connect(mongoDB)
  console.log('DB connected')
}


// Importing routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const catalogRouter = require('./routes/catalog')

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// Essential third-party middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// Routers middlewares
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog',catalogRouter)




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
