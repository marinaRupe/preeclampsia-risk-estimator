const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const EnumMeasurement = sequelize.define('EnumMeasurement', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateMeasured: {
      type: Sequelize.DATE,
    },
    value: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    hrName: {
      type: Sequelize.STRING,
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
      }
    });
  };

  return EnumMeasurement;
};
