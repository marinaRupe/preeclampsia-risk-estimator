import * as types from './user.actionTypes';

export const fetchUsers = ({ status, data }) => {
	return {
		data,
		status,
		type: types.UPDATE_USERS,
	};
};

export const addUser = ({ status, data }) => {
	return {
		data,
		status,
		type: types.ADD_USER,
	};
};

export const editUser = ({ status, data }) => {
	return {
		data,
		status,
		type: types.EDIT_USER,
	};
};

export const editUserPassword = ({ status, data }) => {
	return {
		data,
		status,
		type: types.EDIT_USER_PASSWORD,
	};
};

export const deleteUser = ({ status, data }) => {
	return {
		data,
		status,
		type: types.DELETE_USER,
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
