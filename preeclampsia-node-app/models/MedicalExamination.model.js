const Sequelize = require('sequelize');

module.exports = (sequelize) => {
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
    gestationalAgeByUltrasoundWeeks: {
      type: Sequelize.INTEGER, // TODO: add trimester specific constraints
    },
    gestationalAgeByUltrasoundDays: {
      type: Sequelize.INTEGER, // TODO: add trimester specific constraints
    },
    ultrasoundDate: {
      type: Sequelize.DATE,
    },
    bloodTestDate: {
      type: Sequelize.DATE,
    },
    note: {
      type: Sequelize.STRING,
    },
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