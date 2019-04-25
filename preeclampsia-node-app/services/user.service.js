const { db } = require('../models');

const findById = async (id) => {
  const user = await db.User.findOne({
    where: { id }
  });

  return user;
};

const existsEmail = async (email) => {
  const user = await db.User.findOne({
    where: { email }
  });

  return !!user;
};

const createUser = async (userData) => {
  const {
    firstName,
    lastName,
    email,
    role,
    password
  } = userData;

  const user = await db.User.create({
    firstName,
    lastName,
    role,
    email,
    hashedPassword: password
  });

  return user;
};

module.exports = {
  findById,
  createUser,
  existsEmail,
};
