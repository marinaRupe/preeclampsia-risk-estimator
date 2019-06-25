import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import Dialog from 'react-bootstrap-dialog';
import ReactTable from 'react-table';
import { getTranslations, getLanguage } from 'utils/translation.utils';
import {
	getReactTableConstants,
	sortDirections,
	defaultPageSize,
} from 'constants/reactTable.constants';
import { userRoles } from 'constants/roles.constants';
import * as userActions from 'redux/users/user.actions';
import { formatDate } from 'utils/dateTime.utils';
import AddUserModal from './content/UserForm/AddUserModal';
import EditUserModal from './content/UserForm/EditUserModal';
import UserSidebar from './content/UserSidebar';
import DeleteUserModal from './content/DeleteUserModal';
import EditUserPasswordModal from './content/UserPasswordForm/EditUserPasswordModal';

class UserList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			addUserModalIsOpen: false,
			editUserModalIsOpen: false,
			deleteUserModalIsOpen: false,
			editUserPasswordModalIsOpen: false,
			selectedUser: null,
			page: 1,
			pageSize: defaultPageSize,
			sortColumn: '',
			sortDirection: '',
		};
	}

	fetchData = (state, instance) => {
		const { page, pageSize, sorted } = state;

		const sortColumn = sorted[0] && sorted[0].id;
		const sortDirection = sorted[0] && (sorted[0].desc ? sortDirections.DESC : sortDirections.ASC);

		this.setState({
			page: page + 1,
			pageSize,
			sortColumn,
			sortDirection,
		}, this.updateTable);
	}

	updateTable = () => {
		const { page, pageSize, sortColumn, sortDirection } = this.state;

		this.setState({
			isLoading: true,
			selectUser: null,
		}, async () => {
			const { fetchUserList } = this.props;
			await fetchUserList(page, pageSize, sortColumn, sortDirection);

			this.setState({
				isLoading: false,
			});
		});
	}

	refreshTable = () => {
		this.setState({
			page: 1,
			pageSize: defaultPageSize,
			sortColumn: '',
			sortDirection: '',
		}, this.updateTable);
	}

	openAddUserModal = () => {
		this.setState({ addUserModalIsOpen: true });
	}

	closeAddUserModal = () => {
		this.setState({ addUserModalIsOpen: false });
	}

	openEditUserModal = () => {
		this.setState({ editUserModalIsOpen: true });
	}

	closeEditUserModal = () => {
		this.setState({ editUserModalIsOpen: false });
	}

	openDeleteUserModal = () => {
		this.setState({ deleteUserModalIsOpen: true });
	}

	closeDeleteUserModal = () => {
		this.setState({ deleteUserModalIsOpen: false });
	}

	openEditUserPasswordModal = () => {
		this.setState({ editUserPasswordModalIsOpen: true });
	}

	closeEditUserPasswordModal = () => {
		this.setState({ editUserPasswordModalIsOpen: false });
	}

	selectUser = (selectedUser) => {
		this.setState({ selectedUser });
	}

	unselectUser = () => {
		this.setState({ selectedUser: null });
	}

	isRowSelected = (rowData) => {
		const { selectedUser } = this.state;
		return selectedUser && selectedUser.id === rowData.id;
	}

	addUser = async (userData) => {
		const { createUser } = this.props;
		await createUser(userData);
		this.closeAddUserModal();
		this.refreshTable();
	};

	editUser = async (userData) => {
		const { updateUser } = this.props;
		await updateUser(userData);
		this.closeEditUserModal();
	};

	deleteUser = async (userId) => {
		const { removeUser } = this.props;
		try {
			await removeUser(userId);
			this.unselectUser();
			this.closeDeleteUserModal();
			this.refreshTable();
		} catch (err) {
			this.dialog.showAlert(err.data && err.data.message);
		}
	};

	editUserPassword = async (userPasswordData) => {
		const { selectedUser } = this.state;
		const { updateUserPassword } = this.props;
		await updateUserPassword(selectedUser.id, userPasswordData);
		this.closeEditUserPasswordModal();
	}

	getColumns = () => {
		const userRolesValues = Object.values(userRoles);
		const language = getLanguage();
		const translations = getTranslations();
	
		return [
			{
				Header: translations.user.property.email,
				accessor: 'email'
			},
			{
				Header: translations.user.property.firstName,
				accessor: 'firstName',
			},
			{
				Header: translations.user.property.lastName,
				accessor: 'lastName',
			},
			{
				Header: translations.user.property.role,
				accessor: 'role',
				Cell: props => (
					<span>
						{props.value
							? userRolesValues.find(u => u.value === props.value)[language]
							: '-'
						}
					</span>
				)
			},
			{
				Header: translations.user.property.createdAt,
				accessor: 'createdAt',
				Cell: props => <span>{formatDate(props.value)}</span>
			},
		];
	}

	render() {
		const {
			isLoading,
			addUserModalIsOpen,
			editUserModalIsOpen,
			deleteUserModalIsOpen,
			editUserPasswordModalIsOpen,
			selectedUser,
		} = this.state;
		const { users, totalPages } = this.props;

		const translations = getTranslations();

		return (
			<div className='page'>
				<Dialog ref={(r) => { this.dialog = r; }} />
				<AddUserModal
					show={addUserModalIsOpen}
					handleClose={this.closeAddUserModal}
					onSubmit={this.addUser}
				/>
				<EditUserModal
					show={editUserModalIsOpen}
					handleClose={this.closeEditUserModal}
					onSubmit={this.editUser}
					initialValues={selectedUser}
				/>
				<DeleteUserModal
					show={deleteUserModalIsOpen}
					user={selectedUser}
					deleteUser={this.deleteUser}
					handleClose={this.closeDeleteUserModal}
				/>
				<EditUserPasswordModal
					show={editUserPasswordModalIsOpen}
					handleClose={this.closeEditUserPasswordModal}
					onSubmit={this.editUserPassword}
					initialValues={selectedUser}
				/>
				<div className='patient-list__header mb-10'>
					<h1>{translations.user.listTitle}</h1>
					<Button
						bsStyle='primary'
						onClick={this.openAddUserModal}
					>
						{translations.user.action.add}
					</Button>
				</div>

				<div className={`ml-20 table-view ${selectedUser ? 'row-selected' : ''}`}>
					<div className='table-view--table'>
						<div className='ml-10'>
							<ReactTable
								loading={isLoading}
								data={users}
								pages={totalPages}
								columns={this.getColumns()}
								onFetchData={this.fetchData}
								{...getReactTableConstants()}
								getTrProps={(state, rowInfo) => {
									if (!rowInfo) {
										return {};
									}
									return {
										onClick: this.selectUser.bind(null, rowInfo.original),
										className:`react-table__row ${this.isRowSelected(rowInfo.original)
											? 'is-active'
											: ''
										}`
									};
								}}
							/>
						</div>
					</div>
					{
						selectedUser &&
						<UserSidebar
							user={selectedUser}
							closeSidebar={this.unselectUser}
							openEditUserModal={this.openEditUserModal}
							openDeleteUserModal={this.openDeleteUserModal}
							openEditUserPasswordModal={this.openEditUserPasswordModal}
						/>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ users }) => {
	return {
		users: users.list.data,
		totalPages: users.list.totalPages,
	};
};

const mapDispatchToProps = {
	fetchUserList: userActions.fetchUserList,
	createUser: userActions.createUser,
	updateUser: userActions.updateUser,
	removeUser: userActions.removeUser,
	updateUserPassword: userActions.updateUserPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
