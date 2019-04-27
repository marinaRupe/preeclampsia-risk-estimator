const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');

const expressConfig = require('./configuration/express.config');
const routesConfig = require('./configuration/routes.config');
const sequelizeConfig = require('./configuration/sequelize.config');
const passportConfig = require('./configuration/passport.config');

const errorMiddleware = require('./middlewares/error.middleware');

const app = express();
expressConfig.initialize(app);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routesConfig.configure(app);

sequelizeConfig.configure().then(() => {
  sequelizeConfig.initializeDatabase().then(() => {
    passportConfig.configure(app);
  });
});

app.use(errorMiddleware);

expressConfig.listen(app);

module.exports = app;
