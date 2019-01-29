const debug = require('debug')('node:server');
const http = require('http');
const dotenv = require('dotenv');

const allowCrossDomain = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
};

const isProduction = () => process.env.NODE_ENV && process.env.NODE_ENV === 'production';
const isDevelopment = () => !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const initialize = app => {
  if (isDevelopment()) {
    dotenv.config({ path: '.env' });
    app.use(allowCrossDomain);
  }
};

const normalizePort = val => {
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

const onListening = server => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  debug(`Listening on ${bind}`);
};

const listen = app => {
  const port = normalizePort(process.env.PORT || '3001');
  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port);
  server.on('listening', onListening.bind(null, server));
};

module.exports = {
  initialize,
  listen,
  isProduction,
  isDevelopment,
};
