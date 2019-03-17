const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const BooleanMeasurement = sequelize.define('BooleanMeasurement', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  });
  
  BooleanMeasurement.associate = (models) => {
    models.BooleanMeasurement.belongsTo(models.Characteristic, {
      foreignKey: {
        name: 'characteristicId',
        allowNull: false,
      }
    });
  };

  return BooleanMeasurement;
};
