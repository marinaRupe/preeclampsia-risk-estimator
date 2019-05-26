import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import history from '../../history';
import { APP } from '../../constants/routes';
import * as pregnancyActions from '../../redux/actions/pregnancy.actions';
import { getTranslations } from '../../utils/translation.utils';
import Spinner from '../../components/Spinner';
import FirstTrimesterDetails from './components/FirstTrimesterDetails';
import BasicInfo from './components/BasicInfo';

class PregnancyDetails extends Component {
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
        fetchPregnancyDetails,
        fetchMedicalExaminationsForPregnancy,
        match: { params: { patientId, pregnancyNumber } },
      } = this.props;

      const pregnancy = await fetchPregnancyDetails(patientId, pregnancyNumber);
      await fetchMedicalExaminationsForPregnancy(pregnancy.id);

      this.setState({
        isLoading: false,
      });
    });
  }

  calculateRisk = (medicalExaminationId) => {
    const {
      match: { params: { patientId, pregnancyNumber } },
    } = this.props;

    history.push(APP.RISK_ESTIMATE(patientId, pregnancyNumber, medicalExaminationId));
  }

  render() {
    const { pregnancyDetails, medicalExaminations } = this.props;
    const { isLoading } = this.state;

    const translations = getTranslations();

    if (isLoading || !pregnancyDetails) {
      return (
        <div className='page'>
          <h1>{translations.pregnancy.detailsTitle}</h1>
          <div className='align-horizontal--center'>
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className='page'>
        <h1>{translations.pregnancy.detailsTitle}</h1>
      
        <div>
          <BasicInfo pregnancy={pregnancyDetails} />

          <h2>{translations.pregnancy.trimestersTitle}</h2>

          <FirstTrimesterDetails
            pregnancyId={pregnancyDetails.id}
            medicalExaminations={medicalExaminations.filter(me => me.trimesterNumber === 1)}
            calculateRisk={this.calculateRisk}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ pregnancy }) => {
  return {
    pregnancyDetails: pregnancy.details,
    medicalExaminations: pregnancy.medicalExaminations,
  };
};

const mapDispatchToProps = {
  fetchPregnancyDetails: pregnancyActions.fetchPatientPregnancyDetails,
  fetchMedicalExaminationsForPregnancy: pregnancyActions.fetchMedicalExaminationsForPregnancy,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PregnancyDetails));
