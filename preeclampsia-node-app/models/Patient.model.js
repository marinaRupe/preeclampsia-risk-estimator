const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Patient = sequelize.define('Patient', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phoneNumber: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
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
