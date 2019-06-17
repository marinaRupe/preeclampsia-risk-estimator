import values from 'constants/values.constants';
import { userListSortColumnNames } from 'constants/user.constants';
import { sortDirections } from 'constants/query.constants';
import { getSortColumnName, getSortDirection } from 'utils/query.utils';
import { encrypt } from 'utils/encryption.utils';
import { db } from 'models/index';

const getAll = async (
	page = values.DEFAULT_PAGE,
	pageSize = values.DEFAULT_PAGE_SIZE,
	sortColumn: string,
	sortDirection: string,
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

const getById = async (id: number) => await db.User.findByPk(id);

const existsEmail = async (email: string) => {
	const user = await db.User.findOne({
		where: { email }
	});

	return !!user;
};

const existsWithId = async (id: number): Promise<boolean> => !!(await getById(id));

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

const updateUser = async (userId: number, userData) => {
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

const updateUserPassword = async (userId: number, password: string) => {
	const user = await getById(userId);

	return await user.update({
		hashedPassword: await encrypt(password),
	});
};

const removeUser = async (id: number) => {
	const user = await getById(id);

	return await user.destroy();
};

export default {
	getAll,
	getById,
	createUser,
	removeUser,
	updateUser,
	updateUserPassword,
	existsEmail,
	existsWithId,
};
