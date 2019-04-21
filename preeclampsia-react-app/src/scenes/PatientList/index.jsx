import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import ReactTable from 'react-table';
import { reactTableConstants } from '../../constants/reactTable.constants';
import { APP } from '../../constants/routes';
import * as patientActions from '../../redux/actions/patient.actions';
import { formatDate } from '../../utils/dateTime.utils';
import Spinner from '../../components/Spinner';
import AddPatientModal from './content/AddPatientModal';

class PatientList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      addPatientModalIsOpen: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const { fetchPatientList } = this.props;
      await fetchPatientList();

      this.setState({
        isLoading: false,
      });
    });
  }

  openAddPatientModal = () => {
    this.setState({ addPatientModalIsOpen: true });
  }

  closeAddPatientModal = () => {
    this.setState({ addPatientModalIsOpen: false });
  }

  getColumns = () => {
    return [
      {
        Header: 'MBO',
        accessor: 'MBO'
      },
      {
        Header: 'Ime',
        accessor: 'firstName',
        Cell: props => (
          <span>
            <Link to={APP.PATIENT.DETAILS(props.original.id)}>
              {props.value}
            </Link>
          </span>
        )
      },
      {
        Header: 'Prezime',
        accessor: 'lastName',
        Cell: props => <span>{props.value}</span>
      },
      {
        Header: 'Datum unosa',
        accessor: 'createdAt',
        Cell: props => <span>{formatDate(props.value)}</span>
      },
    ];
  }

  render() {
    const { patients }  = this.props;
    const { isLoading, addPatientModalIsOpen } = this.state;

    if (isLoading) {
      return (
        <div className='page'>
          <div className='patient-list__header mb-10'>
            <h1>Lista pacijenata</h1>
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
        <AddPatientModal
          show={addPatientModalIsOpen}
          handleClose={this.closeAddPatientModal}
        />
        <div className='page__header mb-10'>
          <h1>Lista pacijenata</h1>
          <Button
            bsStyle='primary'
            onClick={this.openAddPatientModal}
          >
            Dodaj pacijenta
          </Button>
        </div>

        <div className='ml-20'>
          <div className='ml-10'>
            <ReactTable
              data={patients}
              columns={this.getColumns()}
              {...reactTableConstants}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ patients }) => {
  return {
    patients: patients.list.data,
  };
};

const mapDispatchToProps = {
  fetchPatientList: patientActions.fetchPatientList,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientList);
