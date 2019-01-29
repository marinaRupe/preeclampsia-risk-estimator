const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const expressConfig = require('./configuration/express.config');
const routesConfig = require('./configuration/routes.config');
const sequelizeConfig = require('./configuration/sequelize.config');

const app = express();
expressConfig.initialize(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routesConfig.configure(app);

sequelizeConfig.configure().then(() => {
  sequelizeConfig.initializeDatabase();
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

expressConfig.listen(app);

module.exports = app;
