import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as patientActions from '../../redux/actions/patient.actions';
import { API, APP } from '../../constants/routes';

class PatientData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEditModeOn: false,
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

  render() {
    const { patient } = this.props;

    if (!patient) return null;

    return (
      <div className='page'>
        <h1>Podaci o pacijentu</h1>

        <div>
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
            <div>{patient.birthDate}</div>
          </div>

          <div>
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

        <div>
          <h3>Medicinska povijest pacijenta</h3>
          <div>TODO: najažurniji podaci</div>
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