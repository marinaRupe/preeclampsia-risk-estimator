const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const NumericalMeasurement = sequelize.define('NumericalMeasurement', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    value: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  });
  
  NumericalMeasurement.associate = (models) => {
    models.NumericalMeasurement.belongsTo(models.Characteristic, {
      foreignKey: {
        name: 'characteristicId',
        allowNull: false,
      }
    });
  };

  return NumericalMeasurement;
};
