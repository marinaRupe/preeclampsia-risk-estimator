import * as Sequelize from 'sequelize';

export default (sequelize) => {
	const MedicalExamination = sequelize.define('MedicalExamination', {
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		trimesterNumber: {
			type: Sequelize.INTEGER,
			allowNull: false,
			validate: {
				isIn: [[1, 2, 3]]
			},
		},
		protocol: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		ultrasoundDate: {
			type: Sequelize.DATEONLY,
		},
		gestationalAgeByUltrasoundWeeks: {
			type: Sequelize.INTEGER,
		},
		gestationalAgeByUltrasoundDays: {
			type: Sequelize.INTEGER,
		},
		bloodTestDate: {
			type: Sequelize.DATEONLY,
		},
		gestationalAgeOnBloodTestWeeks: {
			type: Sequelize.INTEGER,
		},
		gestationalAgeOnBloodTestDays: {
			type: Sequelize.INTEGER,
		},
		note: {
			type: Sequelize.STRING,
		},
	}, {
		paranoid: true,
	});

	MedicalExamination.associate = (models) => {
		models.MedicalExamination.hasMany(models.BooleanMeasurement, {
			foreignKey: {
				name: 'medicalExaminationId',
				allowNull: false,
			},
			as: 'booleanMeasurements',
		});

		models.MedicalExamination.hasMany(models.EnumMeasurement, {
			foreignKey: {
				name: 'medicalExaminationId',
				allowNull: false,
			},
			as: 'enumMeasurements',
		});

		models.MedicalExamination.hasMany(models.NumericalMeasurement, {
			foreignKey: {
				name: 'medicalExaminationId',
				allowNull: false,
			},
			as: 'numericalMeasurements',
		});

		models.MedicalExamination.hasMany(models.Report, {
			foreignKey: {
				name: 'medicalExaminationId',
				allowNull: false,
			},
			as: 'reports',
		});

		models.MedicalExamination.belongsTo(models.Pregnancy, {
			foreignKey: {
				name: 'pregnancyId',
				allowNull: false,
			},
			as: 'pregnancy',
		});
	};

	return MedicalExamination;
};
