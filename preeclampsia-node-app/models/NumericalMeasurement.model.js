const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const NumericalMeasurement = sequelize.define('NumericalMeasurement', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateMeasured: {
      type: Sequelize.DATE,
    },
    value: {
      type: Sequelize.DOUBLE,
      vallowNull: false,
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
