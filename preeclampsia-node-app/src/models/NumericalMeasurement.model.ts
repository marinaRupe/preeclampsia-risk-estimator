import * as Sequelize from 'sequelize';

export default (sequelize) => {
	const NumericalMeasurement = sequelize.define('NumericalMeasurement', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		value: {
			type: Sequelize.DOUBLE,
			allowNull: false,
		},
	}, {
		paranoid: true,
	});
  
	NumericalMeasurement.associate = (models) => {
		models.NumericalMeasurement.belongsTo(models.Characteristic, {
			foreignKey: {
				name: 'characteristicId',
				allowNull: false,
			},
			as: 'characteristic',
		});

		models.NumericalMeasurement.belongsTo(models.MedicalExamination, {
			foreignKey: {
				name: 'medicalExaminationId',
				allowNull: false,
			},
			as: 'medicalExamination',
		});
	};

	return NumericalMeasurement;
};
