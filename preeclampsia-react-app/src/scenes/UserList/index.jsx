import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import {
  reactTableConstants,
  sortDirections,
  defaultPageSize,
} from '../../constants/reactTable.constants';
import { userRoles } from '../../constants/roles.constants';
import * as userActions from '../../redux/actions/user.actions';
import { formatDate } from '../../utils/dateTime.utils';
import AddUserModal from './content/UserForm/AddUserModal';
import EditUserModal from './content/UserForm/EditUserModal';
import UserSidebar from './content/UserSidebar';
import DeleteUserModal from './content/DeleteUserModal';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      addUserModalIsOpen: false,
      editUserModalIsOpen: false,
      deleteUserModalIsOpen: false,
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
    await removeUser(userId);
    this.unselectUser();
    this.closeDeleteUserModal();
    this.refreshTable();
  };

  getColumns = () => {
    const userRolesValues = Object.values(userRoles);
  
    return [
      {
        Header: 'E-mail',
        accessor: 'email'
      },
      {
        Header: 'Ime',
        accessor: 'firstName',
      },
      {
        Header: 'Prezime',
        accessor: 'lastName',
      },
      {
        Header: 'Uloga',
        accessor: 'role',
        Cell: props => (
          <span>
            {props.value
              ? userRolesValues.find(u => u.value === props.value).hr
              : '-'
            }
          </span>
        )
      },
      {
        Header: 'Datum unosa',
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
      selectedUser,
    } = this.state;
    const { users, totalPages } = this.props;

    return (
      <div className='page'>
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
        <div className='patient-list__header mb-10'>
          <h1>Lista korisnika</h1>
          <Button
            bsStyle='primary'
            onClick={this.openAddUserModal}
          >
            Dodaj korisnika
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
                {...reactTableConstants}
                getTrProps={(state, rowInfo) => {
                  if (!rowInfo) {
                    return {};
                  }
                  return {
                    onClick: this.selectUser.bind(null, rowInfo.original),
                    className:`react-table__row ${this.isRowSelected(rowInfo.original) ? 'is-active' : ''}`
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
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
