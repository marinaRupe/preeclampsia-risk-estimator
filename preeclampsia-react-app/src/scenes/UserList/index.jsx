import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import { reactTableConstants } from '../../constants/reactTable.constants';
import { formatDate } from '../../utils/dateTime.utils';
import Spinner from '../../components/Spinner';

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      addUserModalIsOpen: false,
    };
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
        Header: 'Korisničko ime',
        accessor: 'username'
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
        Header: 'Datum unosa',
        accessor: 'createdAt',
        Cell: props => <span>{formatDate(props.value)}</span>
      },
    ];
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='page'>
          <div className='page__header mb-10'>
            <h1>Lista korisnika</h1>
          </div>
          
          <div className='ml-20'>
            <div className='align-horizontal--center'>
              <Spinner />
            </div>
          </div>
        </div>
      );
    }

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
              data={[]}
              columns={this.getColumns()}
              {...reactTableConstants}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(UserList);
