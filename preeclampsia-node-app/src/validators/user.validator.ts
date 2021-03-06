import constraints from 'constants/constraints.constants';
import UserRoles from 'constants/roles.constants';
import UserService from 'services/user.service';
import { addToArray } from 'utils/array.utils';
import { isDefined } from 'utils/value.utils';

const isValidUser = async (user, translations, editMode = false) => {
	const {
		email,
		firstName,
		lastName,
		role,
		password,
		repeatedPassword,
	} = user;

	const errors = {} as any;

	if (!isDefined(firstName)) {
		errors.firstName = addToArray(errors.firstName, translations.firstNameRequired);
	}

	if (!isDefined(lastName)) {
		errors.lastName = addToArray(errors.lastName, translations.lastNameRequired);
	}

	if (!isDefined(role)) {
		errors.role = addToArray(errors.role, translations.roleRequired);
	} else {
		const roleExists = Object.values(UserRoles).includes(role);
		if (!roleExists) {
			errors.role = addToArray(errors.role, translations.roleNotExist);
		}
	}

	if (!editMode) {
		if (!isDefined(email)) {
			errors.email = addToArray(errors.email, translations.emailRequired);
		} else {
			if (!email.match(constraints.EMAIL_REGEX)) {
				errors.email = addToArray(errors.email, translations.emailInvalid);
			} else if (await UserService.existsEmail(email)) {
				errors.email = addToArray(errors.email, translations.userWithEmailExist);
			}
		}

		if (!isDefined(password)) {
			errors.password = addToArray(errors.password, translations.passwordRequired);
		} else {
			if (password.length < constraints.MIN_PASSWORD_LENGTH) {
				errors.password = addToArray(
					errors.password, translations.minPasswordLength(constraints.MIN_PASSWORD_LENGTH)
				);
			}
		}

		if (!isDefined(repeatedPassword)) {
			errors.repeatedPassword = addToArray(errors.repeatedPassword, translations.repeatedPasswordRequired);
		} else {
			if (repeatedPassword !== password) {
				errors.repeatedPassword = addToArray(errors.repeatedPassword, translations.passwordsNotMatch);
			}
		}
	}

	const isValid = Object.keys(errors).length === 0;
	return {
		isValid,
		errors,
	};
};

const isValidUserPassword = async (userData, translations) => {
	const {
		password,
		repeatedPassword,
	} = userData;

	const errors = {} as any;

	if (!password) {
		errors.password = addToArray(errors.password, translations.passwordRequired);
	} else {
		if (password.length < constraints.MIN_PASSWORD_LENGTH) {
			errors.password = addToArray(
				errors.password, translations.minPasswordLength(constraints.MIN_PASSWORD_LENGTH)
			);
		}
	}

	if (!repeatedPassword) {
		errors.repeatedPassword = addToArray(errors.repeatedPassword, translations.repeatedPasswordRequired);
	} else {
		if (repeatedPassword !== password) {
			errors.repeatedPassword = addToArray(errors.repeatedPassword, translations.passwordsNotMatch);
		}
	}

	const isValid = Object.keys(errors).length === 0;
	return {
		isValid,
		errors,
	};
};

export default {
	isValidUser,
	isValidUserPassword,
};
