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
      validate: {
        notNull: true,
      },
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
    resultedWithPE: {
      type: Sequelize.BOOLEAN,
    },
  });

  Pregnancy.associate = (models) => {
    models.Pregnancy.hasMany(models.PregnancyTrimester, {
      foreignKey: {
        name: 'pregnancyId',
        allowNull: false,
      },
      as: 'pregnancyTrimesters',
    });
  };

  return Pregnancy;
};
