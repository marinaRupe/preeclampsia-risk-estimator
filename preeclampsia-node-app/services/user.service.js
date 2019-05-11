const values = require('../constants/values.constants');
const { userListSortColumnNames } = require('../constants/user.constants');
const { sortDirections } = require('../constants/query.constants');
const { getSortColumnName, getSortDirection } = require('../utils/query.utils');
const { db } = require('../models');

const getAll = async (
  page = values.DEFAULT_PAGE,
  pageSize = values.DEFAULT_PAGE_SIZE,
  sortColumn,
  sortDirection,
) => (
  await db.User.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    order: [
      [
        getSortColumnName(sortColumn, userListSortColumnNames),
        getSortDirection(sortDirection, sortDirections.DESC),
      ],
    ],
  })
);

const getById = async (id) => await db.User.findByPk(id);

const existsEmail = async (email) => {
  const user = await db.User.findOne({
    where: { email }
  });

  return !!user;
};

const existsWithId = async (id) => !!(await getById(id));

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

const updateUser = async (userId, userData) => {
  const {
    firstName,
    lastName,
    email,
    role,
  } = userData;

  const user = await getById(userId);

  return await user.update({
    firstName,
    lastName,
    role,
    email,
  });
};

const updateUserPassword = async (userId, password) => {
  const user = await getById(userId);

  return await user.update({
    hashedPassword: password,
  });
};

const removeUser = async (userId) => {
  const user = await getById(userId);

  return await user.destroy();
};

module.exports = {
  getAll,
  getById,
  createUser,
  removeUser,
  updateUser,
  updateUserPassword,
  existsEmail,
  existsWithId,
};
