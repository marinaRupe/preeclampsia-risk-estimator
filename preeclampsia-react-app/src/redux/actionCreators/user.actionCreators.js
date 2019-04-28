import * as types from '../actionTypes';

export const fetchUsers = ({ status, data }) => {
  return {
    data,
    status,
    type: types.FETCH_USERS,
  };
};

export const addUser = ({ status, data }) => {
  return {
    data,
    status,
    type: types.ADD_USER,
  };
};

export const loginUser = ({ status, data }) => {
  return {
    data,
    status,
    type: types.USER_LOGIN,
  };
};

export const logoutUser = ({ status, data }) => {
  return {
    data,
    status,
    type: types.USER_LOGOUT,
  };
};
