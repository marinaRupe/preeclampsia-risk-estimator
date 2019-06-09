import * as Sequelize from 'sequelize';
import { CharacteristicTypes } from'constants/characteristics.constants';

export default (sequelize) => {
	const Characteristic = sequelize.define('Characteristic', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		enName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		hrName: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		type: {
			type: Sequelize.ENUM(...Object.values(CharacteristicTypes)),
		},
	}, {
		paranoid: true,
	});

	return Characteristic;
};
