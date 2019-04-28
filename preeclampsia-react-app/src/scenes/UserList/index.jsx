import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import { reactTableConstants, sortDirections } from '../../constants/reactTable.constants';
import * as userActions from '../../redux/actions/user.actions';
import { formatDate } from '../../utils/dateTime.utils';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      addUserModalIsOpen: false,
    };
  }

  fetchData = (state, instance) => {
    const { page, pageSize, sorted } = state;

    const sortColumn = sorted[0] && sorted[0].id;
    const sortDirection = sorted[0] && (sorted[0].desc ? sortDirections.DESC : sortDirections.ASC);

    this.setState({
      isLoading: true,
    }, async () => {
      const { fetchUserList } = this.props;
      await fetchUserList(page + 1, pageSize, sortColumn, sortDirection);

      this.setState({
        isLoading: false,
      });
    });
  }

  openAddUserModal = () => {
    this.setState({ addUserModalIsOpen: true });
  }

  closeAddUserModal = () => {
    this.setState({ addUserModalIsOpen: false });
  }

  getColumns = () => {
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
      },
      {
        Header: 'Datum unosa',
        accessor: 'createdAt',
        Cell: props => <span>{formatDate(props.value)}</span>
      },
    ];
  }

  render() {
    const { isLoading } = this.state;
    const { users, totalPages } = this.props;

    return (
      <div className='page'>
        <div className='patient-list__header mb-10'>
          <h1>Lista korisnika</h1>
          <Button
            bsStyle='primary'
            onClick={this.openAddPatientModal}
          >
            Dodaj korisnika
          </Button>
        </div>

        <div className='ml-20'>
          <div className='ml-10'>
            <ReactTable
              loading={isLoading}
              data={users}
              pages={totalPages}
              columns={this.getColumns()}
              onFetchData={this.fetchData}
              {...reactTableConstants}
            />
          </div>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(UserList);
