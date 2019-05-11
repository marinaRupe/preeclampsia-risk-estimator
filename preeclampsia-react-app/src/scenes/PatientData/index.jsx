import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as patientActions from '../../redux/actions/patient.actions';
import { APP } from '../../constants/routes';
import { formatDate, getAgeInYears } from '../../utils/dateTime.utils';
import Spinner from '../../components/Spinner';

class PatientData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      editPatientModalIsOpen: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchPatientDetails,
        match: { params: { patientId } },
      } = this.props;

      await fetchPatientDetails(patientId);

      this.setState({
        isLoading: false,
      });
    });
  }

  openEditPatientModal = () => {
    this.setState({ editPatientModalIsOpen: true });
  }

  closeEditPatientModal = () => {
    this.setState({ editPatientModalIsOpen: false });
  }

  render() {
    const { patient } = this.props;
    const { isLoading } = this.state;

    if (isLoading || !patient) {
      return (
        <div className='page'>
          <div className='patient-details__header mb-10'>
            <h1>Podaci o pacijentu</h1>
          </div>
          <div className='patient-details__content ml-20'>
            <div className='align-horizontal--center'>
              <Spinner />
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className='page'>
        <div className='patient-details__header mb-10'>
          <h1>Podaci o pacijentu</h1>
          <Button
            bsStyle='primary'
            onClick={this.openEditPatientModal}
          >
            Uredi podatke o pacijentu
          </Button>
        </div>

        <div className='patient-details__content ml-20'>
          <div className='info-group'>
            <label>Ime: </label>
            <div>{patient.firstName}</div>
          </div>

          <div className='info-group'>
            <label>Prezime: </label>
            <div>{patient.lastName}</div>
          </div>

          <div className='info-group'>
            <label>Datum rođenja: </label>
            <div>{formatDate(patient.birthDate)}</div>
          </div>

          <div className='info-group'>
            <label>Starost u godinama: </label>
            <div>{getAgeInYears(patient.birthDate)}</div>
          </div>

          <div className='info-group'>
            <label>Etnička skupina: </label>
            <div>{patient.racialOrigin}</div>
          </div>

          <div className='patient-details__pregnancies'>
            <h3>Povijest trudnoća</h3>
            {(patient.pregnancies || []).map(preg => (
              <div key={preg.id}>
                <Link to={APP.PATIENT.PREGNANCY_DETAILS(patient.id, preg.pregnancyNumber)}>
                  {preg.pregnancyNumber}. trudnoća
                </Link>
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
    patient: patients.patientDetails,
  };
};

const mapDispatchToProps = {
  fetchPatientDetails: patientActions.fetchPatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PatientData));