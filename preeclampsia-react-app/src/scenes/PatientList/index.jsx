import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as patientActions from '../../redux/actions/patient.actions';
import { APP } from '../../constants/routes';

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

  render() {
    const { patients }  = this.props;
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div className='page'>
          <div className='patient-list__header mb-10'>
            <h1>Lista pacijenata</h1>
          </div>
          
          <div className='ml-20'>
            <div className='ml-10'>
              <h4>Učitavanje podataka...</h4>
              {/* add spinner */}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='page'>
        <div className='patient-list__header mb-10'>
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
            {patients.map((p, index) => (
              <div className='patient-list__item' key={p.id}>
                <span>
                  <span>{index + 1}. </span>
                  <Link to={APP.PATIENT.DETAILS(p.id)}>
                    {p.firstName} {p.lastName}
                  </Link>
                </span>
              </div>
            ))}
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
