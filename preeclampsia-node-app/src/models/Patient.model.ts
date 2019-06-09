import * as  Sequelize from 'sequelize';
import { RacialOriginTypes } from 'constants/patient.constants';

export default (sequelize) => {
  const Patient = sequelize.define('Patient', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MBO: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
    },
    racialOrigin: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: RacialOriginTypes.White.key,
      validate: {
        isIn: [Object.values(RacialOriginTypes).map(v => v.key)]
      },
    },
  }, {
    paranoid: true,
  });

  Patient.associate = (models) => {
    models.Patient.hasMany(models.Pregnancy, {
      foreignKey: {
        name: 'patientId',
        allowNull: false,
      },
      as: 'pregnancies',
    });
  };

  return Patient;
};
