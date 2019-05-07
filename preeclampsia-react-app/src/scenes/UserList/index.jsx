import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import { reset } from 'redux-form';
import {
  reactTableConstants,
  sortDirections,
  defaultPageSize,
} from '../../constants/reactTable.constants';
import { userRoles } from '../../constants/roles.constants';
import { ADD_USER_FORM, EDIT_USER_FORM } from '../../redux/forms';
import * as userActions from '../../redux/actions/user.actions';
import { formatDate } from '../../utils/dateTime.utils';
import AddUserModal from './content/AddUserModal';
import EditUserModal from './content/EditUserModal';
import UserSidebar from './content/UserSidebar';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      addUserModalIsOpen: false,
      editUserModalIsOpen: false,
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
    const { resetAddUserForm  } = this.props;
    resetAddUserForm();
  }

  openEditUserModal = (selectedUser) => {
    this.setState({ editUserModalIsOpen: true });
  }

  closeEditUserModal = () => {
    this.setState({ editUserModalIsOpen: false });
    const { resetEditUserForm  } = this.props;
    resetEditUserForm();
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
    // TODO: save user
    this.closeEditUserModal();
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
  resetAddUserForm: reset.bind(null, ADD_USER_FORM),
  resetEditUserForm: reset.bind(null, EDIT_USER_FORM),
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
