require('module-alias/register');

import * as express from 'express';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import expressConfig from 'configuration/express.config';
import routesConfig from 'configuration/routes.config';
import sequelizeConfig from 'configuration/sequelize.config';
import passportConfig from 'configuration/passport.config';

import errorMiddleware from 'middlewares/error.middleware';

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
		passportConfig.configure(app).then(() => {
			app.use(errorMiddleware);
			expressConfig.listen(app);
		});
	});
});

export default app;
