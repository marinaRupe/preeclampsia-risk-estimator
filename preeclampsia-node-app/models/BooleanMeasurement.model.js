const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const BooleanMeasurement = sequelize.define('BooleanMeasurement', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateMeasured: {
      type: Sequelize.DATE,
    },
    value: {
      type: Sequelize.BOOLEAN,
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
