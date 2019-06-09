import * as  Sequelize from 'sequelize';
import models from 'models/index';

export let sequelize;

const SequelizeObject = Sequelize as any;

export const configure = async () => {
	sequelize = new SequelizeObject(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
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

export const initializeDatabase = async (force = false) => {
	models.initialize(sequelize);
	await sequelize.sync({ force });
};

export default {
	sequelize,
	configure,
	initializeDatabase,
};
