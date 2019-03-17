const Sequelize = require('sequelize');
const models = require('../models');

let sequelize;

const configure = async () => {
  sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: process.env.DB_HOSTNAME,
    dialect: 'postgres',
    logging: false,
  });

  await sequelize.authenticate()
    .then(() => {
      console.info('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
};

const initializeDatabase = async (force = false) => {
  models.initialize(sequelize);
  await sequelize.sync({ force });
};

module.exports = {
  sequelize,
  configure,
  initializeDatabase,
};
