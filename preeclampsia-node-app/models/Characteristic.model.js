const Sequelize = require('sequelize');
const { CharacteristicTypes } = require('../constants/characteristics.constants');

module.exports = (sequelize) => {
  const Characteristic = sequelize.define('Characteristic', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    enName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hrName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    type: {
      type: Sequelize.ENUM(...Object.values(CharacteristicTypes)),
    },
  });

  return Characteristic;
};
