const Sequelize = require('sequelize');
const UserRoles = require('../constants/roles.constants');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    role: {
      type: Sequelize.ENUM(...Object.values(UserRoles)),
      allowNull: false,
    },
    passwordHash: {
      type: Sequelize.STRING,
    },
  });

  User.associate = (models) => {
    models.User.hasMany(models.Report, {
      foreignKey: {
        name: 'generatedBy',
        allowNull: false,
      },
      as: 'reports',
    });
  };

  return User;
};
