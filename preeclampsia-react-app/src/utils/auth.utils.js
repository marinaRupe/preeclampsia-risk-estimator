import * as values from 'constants/values';
import { userRolesList } from 'constants/roles.constants';

export const getAllRoles = () => {
	return userRolesList;
};

export const isRoleAllowed = (allowedRoles) => {
	const userRole = getLoginDataFromLocalStorage().user.role;
	return allowedRoles.includes(userRole);
};

export const isUserLoggedIn = () => {
	const { user, token } = getLoginDataFromLocalStorage();
	return !!user && !!token;
};

export const getLoginDataFromLocalStorage = () => ({
	user: JSON.parse(localStorage.getItem(values.USER)),
	token: localStorage.getItem(values.TOKEN)
});

export const addLoginDataToLocalStorage = (user, token) => {
	localStorage.setItem(values.USER, JSON.stringify(user));
	localStorage.setItem(values.TOKEN, token);
};

export const removeLoginDataFromLocalStorage = () => {
	localStorage.removeItem(values.USER);
	localStorage.removeItem(values.TOKEN);
};

export const withPermission = (
	component, notPermittedDisplay = null, loginRequired = true, allowedRoles = userRolesList
) => {
	if (!loginRequired) {
		return component;
	}

	if (loginRequired && isUserLoggedIn()) {
		if (isRoleAllowed(allowedRoles)) {
			return component;
		}
	}

	return notPermittedDisplay;
};
