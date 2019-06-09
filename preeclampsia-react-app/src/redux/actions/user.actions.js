import { ACTION_STATUS } from 'enums/responseStatus.enums';
import { API } from 'constants/routes';
import { actionWrapper } from 'utils/redux.utils';
import {
	addLoginDataToLocalStorage,
	removeLoginDataFromLocalStorage,
} from 'utils/auth.utils';
import * as httpCalls from 'utils/http.utils';
import * as actionCreators from '../actionCreators/user.actionCreators';

export function fetchUserList(page = 1, pageSize = 10, sortColumn, sortDirection) {
	const action = async (dispatch) => {
		const resp = await httpCalls.GET(API.USERS.ALL(page, pageSize, sortColumn, sortDirection));
		if (resp.status === 200) {
			await dispatch(actionCreators.fetchUsers({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
		}
	};
	return actionWrapper(action);
}

export function updateUser(userData) {
	const action = async (dispatch) => {
		const resp = await httpCalls.PUT(API.USERS.BY_ID(userData.id), userData);
		if (resp.status === 200) {
			await dispatch(actionCreators.editUser({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
		}
	};
	return actionWrapper(action, true);
}

export function removeUser(userId) {
	const action = async (dispatch) => {
		const resp = await httpCalls.DELETE(API.USERS.BY_ID(userId));
		if (resp.status === 200) {
			await dispatch(actionCreators.deleteUser({ status: ACTION_STATUS.SUCCESS, data: userId }));
		}
	};
	return actionWrapper(action);
}

export function updateCurrentUser(userData) {
	const action = async (dispatch) => {
		await dispatch(actionCreators.loginUser({ status: ACTION_STATUS.SUCCESS, data: userData }));
	};
	return actionWrapper(action, true);
}

export function loginUser(userData) {
	const action = async (dispatch) => {
		const body = {
			email: userData.email,
			password: userData.password,
		};

		const resp = await httpCalls.POST(API.USERS.LOGIN(), body);
		if (resp.status === 200) {
			const { user, token } = resp.data;
			addLoginDataToLocalStorage(user, token);
			await dispatch(actionCreators.loginUser({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
		}
	};
	return actionWrapper(action, true);
}

export function logoutUser() {
	const action = async (dispatch) => {
		removeLoginDataFromLocalStorage();
		await dispatch(actionCreators.logoutUser({ status: ACTION_STATUS.SUCCESS }));
		window.location.reload();
	};
	return actionWrapper(action);
}

export function createUser(userData) {
	const action = async (dispatch) => {
		const resp = await httpCalls.POST(API.USERS.ROOT, userData);
		if (resp.status === 200) {
			await dispatch(actionCreators.addUser({ status: ACTION_STATUS.SUCCESS, data: resp.data }));
		}
	};
	return actionWrapper(action, true);
}
