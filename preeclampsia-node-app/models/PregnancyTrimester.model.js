const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const PregnancyTrimester = sequelize.define('PregnancyTrimester', {
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

  PregnancyTrimester.associate = (models) => {
    models.PregnancyTrimester.hasMany(models.BooleanMeasurement, {
      foreignKey: {
        name: 'pregnancyTrimesterId',
        allowNull: false,
      },
      as: 'booleanMeasurements',
    });

    models.PregnancyTrimester.hasMany(models.EnumMeasurement, {
      foreignKey: {
        name: 'pregnancyTrimesterId',
        allowNull: false,
      },
      as: 'enumMeasurements',
    });

    models.PregnancyTrimester.hasMany(models.NumericalMeasurement, {
      foreignKey: {
        name: 'pregnancyTrimesterId',
        allowNull: false,
      },
      as: 'numericalMeasurements',
    });

    models.PregnancyTrimester.hasMany(models.Report, {
      foreignKey: {
        name: 'pregnancyTrimesterId',
        allowNull: false,
      },
      as: 'reports',
    });
  };

  return PregnancyTrimester;
};
