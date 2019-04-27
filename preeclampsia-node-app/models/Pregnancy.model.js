const Sequelize = require('sequelize');
const { PregnancyTypes, ConceptionMethods } = require('../constants/pregnancy.constants');

module.exports = (sequelize) => {
  const Pregnancy = sequelize.define('Pregnancy', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pregnancyNumber: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    pregnancyType: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: PregnancyTypes.Singleton.key,
      validate: {
        isIn: [Object.values(PregnancyTypes).map(v => v.key)]
      },
    },
    conceptionMethod: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: ConceptionMethods.Spontaneous.key,
      validate: {
        isIn: [Object.values(ConceptionMethods).map(v => v.key)]
      },
    },
    lastPeriodDate: {
      type: Sequelize.DATEONLY,
    },
    lastPeriodDateIsReliable: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
    },
    birthWeight: {
      type: Sequelize.DOUBLE,
    },
    birthLength: {
      type: Sequelize.DOUBLE,
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
