const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  const Characteristic = sequelize.define('Characteristic', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
    },
  });

  return Characteristic;
};
