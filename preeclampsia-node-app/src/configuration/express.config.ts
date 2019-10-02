import * as debug from 'debug';
import * as http from 'http';
import * as dotenv from 'dotenv';

const debugInstance = debug('node:server');

export const allowCrossDomain = (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
};

export const isProductionEnvironment = () => process.env.NODE_ENV && process.env.NODE_ENV === 'production';
export const isTestEnvironment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'test';
export const isDevelopmentEnvironment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const initialize = app => {
	if (isDevelopmentEnvironment()) {
		dotenv.config({ path: '.env-develop' });
		app.use(allowCrossDomain);
	} else if (isTestEnvironment()) {
		dotenv.config({ path: '.env-test' });
	} else {
		dotenv.config({ path: '.env-prod' });
	}
};

export const normalizePort = val => {
	const normalizedPort = parseInt(val, 10);

	if (Number.isNaN(normalizedPort)) {
		// named pipe
		return val;
	}

	if (normalizedPort >= 0) {
		// port number
		return normalizedPort;
	}

	return false;
};

export const onListening = server => {
	const addr = server.address();
	const bind = typeof addr === 'string'
		? `pipe ${addr}`
		: `port ${addr.port}`;
	debugInstance(`Listening on ${bind}`);
	console.info(`Listening on ${bind}`);
};

export const listen = app => {
	const port = normalizePort(process.env.PORT || '3001');
	app.set('port', port);

	const server = http.createServer(app);

	server.listen(port);
	server.on('listening', onListening.bind(null, server));
};

export default {
	initialize,
	listen,
	isProductionEnvironment,
	isDevelopmentEnvironment,
};
