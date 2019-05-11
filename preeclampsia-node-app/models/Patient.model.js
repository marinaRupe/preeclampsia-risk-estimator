const Sequelize = require('sequelize');

module.exports = (sequelize) => {
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
      type: Sequelize.STRING,
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
