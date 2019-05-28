const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const EnumMeasurement = sequelize.define('EnumMeasurement', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  });
  
  EnumMeasurement.associate = (models) => {
    models.EnumMeasurement.belongsTo(models.Characteristic, {
      foreignKey: {
        name: 'characteristicId',
        allowNull: false,
      },
      as: 'characteristic',
    });

    models.EnumMeasurement.belongsTo(models.MedicalExamination, {
      foreignKey: {
        name: 'medicalExaminationId',
        allowNull: false,
      },
      as: 'medicalExamination',
    });
  };

  return EnumMeasurement;
};
