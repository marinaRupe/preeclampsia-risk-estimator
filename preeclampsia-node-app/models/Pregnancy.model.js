const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Pregnancy = sequelize.define('Pregnancy', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pregnancyNumber: {
      type: Sequelize.INTEGER,
    },
    lastPeriodDate: {
      type: Sequelize.DATE,
    },
    lastPeriodDateIsReliable: {
      type: Sequelize.BOOLEAN,
    },
    endDate: {
      type: Sequelize.DATE,
    },
    numberOfFetuses: {
      type: Sequelize.INTEGER,
    },
    numberOfPreviousPregnancies: {
      type: Sequelize.INTEGER,
    },
    numberOfPreviousBirths: {
      type: Sequelize.INTEGER,
    },
    hadPEInPreviousPregnancy: {
      type: Sequelize.BOOLEAN,
    },
  });

  Pregnancy.associate = (models) => {
    models.Pregnancy.hasMany(models.BooleanMeasurement, {
      foreignKey: {
        name: 'pregnancyId',
        allowNull: false,
      },
      as: 'booleanMeasurements',
    });

    models.Pregnancy.hasMany(models.EnumMeasurement, {
      foreignKey: {
        name: 'pregnancyId',
        allowNull: false,
      },
      as: 'enumMeasurements',
    });

    models.Pregnancy.hasMany(models.NumericalMeasurement, {
      foreignKey: {
        name: 'pregnancyId',
        allowNull: false,
      },
      as: 'numericalMeasurements',
    });
  };

  return Pregnancy;
};
