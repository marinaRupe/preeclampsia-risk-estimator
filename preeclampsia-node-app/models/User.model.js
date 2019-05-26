const Sequelize = require('sequelize');
const UserRoles = require('../constants/roles.constants');
const { encrypt, compareEncrypted } = require('../utils/encryption.utils');

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
    hashedPassword: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    paranoid: true,
  });

  User.prototype.isValidPassword = async function(password) {
    const user = this;
    return await compareEncrypted(password, user.hashedPassword);
  };

  User.addHook('beforeCreate', async (user) => {
    const hashedPassword = await encrypt(user.hashedPassword);
    user.hashedPassword = hashedPassword;
  });
  
  User.associate = (models) => {
    models.User.hasMany(models.Report, {
      foreignKey: {
        name: 'generatedById',
        allowNull: false,
      },
      as: 'reports',
    });
  };

  return User;
};
