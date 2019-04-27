const values = require('../constants/values.constants');
const { db } = require('../models');

const getAll = async (page = values.DEFAULT_PAGE, pageSize = values.DEFAULT_PAGE_SIZE) => (
  await db.User.findAndCountAll({ offset: (page - 1) * pageSize, limit: pageSize })
);

const getById = async (id) => {
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
  getAll,
  getById,
  createUser,
  existsEmail,
};
