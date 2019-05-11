import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as patientActions from '../../redux/actions/patient.actions';
import { APP } from '../../constants/routes';
import { formatDate, getAgeInYears } from '../../utils/dateTime.utils';
import { getTranslations } from '../../utils/translation.utils';
import Spinner from '../../components/Spinner';
import EditPatientModal from '../PatientList/content/EditPatientModal';

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

  editPatient = async (patientData) => {
    const { updatePatient } = this.props;
    await updatePatient(patientData);
    this.closeEditPatientModal();
  }

  render() {
    const { patient } = this.props;
    const { isLoading, editPatientModalIsOpen } = this.state;

    const translations = getTranslations();

    if (isLoading || !patient) {
      return (
        <div className='page'>
          <div className='patient-details__header mb-10'>
            <h1>{translations.patient.detailsTitle}</h1>
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
        <EditPatientModal
          show={editPatientModalIsOpen}
          handleClose={this.closeEditPatientModal}
          onSubmit={this.editPatient}
          initialValues={patient}
        />
        <div className='patient-details__header mb-10'>
          <h1>{translations.patient.detailsTitle}</h1>
          <Button
            bsStyle='primary'
            onClick={this.openEditPatientModal}
          >
            {translations.patient.action.edit}
          </Button>
        </div>

        <div className='patient-details__content ml-20'>
          <div className='info-group'>
            <label>{translations.patient.property.firstName}: </label>
            <div>{patient.firstName}</div>
          </div>

          <div className='info-group'>
            <label>{translations.patient.property.lastName}: </label>
            <div>{patient.lastName}</div>
          </div>

          <div className='info-group'>
            <label>{translations.patient.property.MBO}: </label>
            <div>{patient.MBO}</div>
          </div>

          <div className='info-group'>
            <label>{translations.patient.property.birthDate}: </label>
            <div>{formatDate(patient.birthDate)}</div>
          </div>

          <div className='info-group'>
            <label>{translations.patient.property.ageInYears}: </label>
            <div>{getAgeInYears(patient.birthDate)}</div>
          </div>

          <div className='info-group'>
            <label>{translations.patient.property.racialOrigin}: </label>
            <div>{patient.racialOrigin}</div>
          </div>

          <div className='patient-details__pregnancies'>
            <h3>{translations.patient.pregnanciesTitle}</h3>
            {(patient.pregnancies || []).map(preg => (
              <div key={preg.id}>
                <Link to={APP.PATIENT.PREGNANCY_DETAILS(patient.id, preg.pregnancyNumber)}>
                  {translations.word.pregnancy} {preg.pregnancyNumber}
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
  updatePatient: patientActions.updatePatientDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PatientData));