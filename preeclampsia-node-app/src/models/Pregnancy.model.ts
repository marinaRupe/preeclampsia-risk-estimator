import * as  Sequelize from 'sequelize';
import { PregnancyTypes, ConceptionMethods } from 'constants/pregnancy.constants';

export default (sequelize) => {
  const Pregnancy = sequelize.define('Pregnancy', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    gynecologist: {
      type: Sequelize.STRING,
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
    deliveryDate: {
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
  }, {
    paranoid: true,
  });

  Pregnancy.associate = (models) => {
    models.Pregnancy.hasMany(models.MedicalExamination, {
      foreignKey: {
        name: 'pregnancyId',
        allowNull: false,
      },
      as: 'medicalExaminations',
    });

    models.Pregnancy.belongsTo(models.Patient, {
      foreignKey: {
        name: 'patientId',
        allowNull: false,
      },
      as: 'patient',
    });
  };

  return Pregnancy;
};
