import * as  Sequelize from 'sequelize';
import { RacialOriginTypes } from 'constants/patient.constants';
import { PregnancyTypes, ConceptionMethods } from 'constants/pregnancy.constants';
import { DiabetesTypes } from 'constants/measurements.constants';

export default (sequelize) => {
  const Report = sequelize.define('Report', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    MBO: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    protocol: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    bloodTestDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    weight: {
      type: Sequelize.DOUBLE,
    },
    height: {
      type: Sequelize.DOUBLE,
    },
    racialOrigin: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: RacialOriginTypes.White.key,
      validate: {
        isIn: [Object.values(RacialOriginTypes).map(v => v.key)]
      },
    },
    pregnancyType: {
      type: Sequelize.INTEGER,
      defaultValue: PregnancyTypes.Singleton.key,
      validate: {
        isIn: [Object.values(PregnancyTypes).map(v => v.key)]
      },
    },
    conceptionMethod: {
      type: Sequelize.INTEGER,
      validate: {
        isIn: [Object.values(ConceptionMethods).map(v => v.key)]
      },
    },
    lastPeriodDate: {
      type: Sequelize.DATEONLY,
    },
    hadPEInPreviousPregnancy: {
      type: Sequelize.BOOLEAN,
    },
    smokingDuringPregnancy: {
      type: Sequelize.BOOLEAN,
    },
    diabetesType: {
      type: Sequelize.INTEGER,
      validate: {
        isIn: [Object.values(DiabetesTypes).map(v => v.key)]
      },
    },
    PLGF: {
      type: Sequelize.DOUBLE,
    },
    PAPPA: {
      type: Sequelize.DOUBLE,
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
    gestationalAgeOnBloodTestWeeks: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    gestationalAgeOnBloodTestDays: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    CRL: {
      type: Sequelize.DOUBLE,
    },
    calculatedRisk: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    note: {
      type: Sequelize.STRING,
    },
    dateGenerated: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  }, {
    paranoid: true,
  });

  Report.associate = (models) => {
    models.Report.belongsTo(models.User, {
      foreignKey: {
        name: 'generatedById',
        allowNull: false,
      },
      as: 'generatedBy',
    });

    models.Report.belongsTo(models.MedicalExamination, {
      foreignKey: {
        name: 'medicalExaminationId',
        allowNull: false,
      },
      as: 'medicalExamination',
    });
  };

  return Report;
};
