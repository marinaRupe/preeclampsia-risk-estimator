import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as reportActions from '../../redux/actions/report.actions';
import Spinner from '../../components/Spinner';
import BooleanMeasurement from '../../components/Measurement/BooleanMeasurement';
import EnumMeasurement from '../../components/Measurement/EnumMeasurement';
import NumericalMeasurement from '../../components/Measurement/NumericalMeasurement';
import { formatDate, getAgeInYears } from '../../utils/dateTime.utils';
import { getTranslations } from '../../utils/translation.utils';

class RiskEstimate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const {
        fetchPregnancyDataForReport,
        match: { params: { medicalExaminationId } },
      } = this.props;

      await fetchPregnancyDataForReport(medicalExaminationId);

      this.setState({
        isLoading: false,
      });
    });
  }

  generatePDF = async () => {
    const {
      generatePDFReport,
      match: { params: { medicalExaminationId } },
    } = this.props;

    await generatePDFReport(medicalExaminationId);
  }

  render() {
    const { isLoading } = this.state;
    const { pregnancyDataForReport } = this.props;
    const translations = getTranslations();

    if (isLoading || !pregnancyDataForReport) {
      return (
        <div className='page'>
          <h1>Izvješće o riziku</h1>

          <h3>Podaci o pacijentu:</h3>
          <div className='align-horizontal--center'><Spinner /></div>
          <br />
          <div>
            <Button
              bsStyle='primary'
              onClick={this.generatePDF}
            >
              Generiraj PDF izvješće
            </Button>
          </div>
        </div>
      );
    }

    const { patient, pregnancy, medicalExamination } = pregnancyDataForReport;
    const {
      booleanMeasurements,
      enumMeasurements,
      numericalMeasurements,
    } = medicalExamination;

    return (
      <div className='page'>
        <h1>Izvješće o riziku</h1>

        <h3>Podaci o pacijentu:</h3>

        <div className='pregnancy__card'>
          <div className='info-group'>
            <label>{translations.patient.property.firstName}: </label>
            <div>{pregnancyDataForReport.patient.firstName || '-'}</div>
          </div>
          <div className='info-group'>
            <label>{translations.patient.property.lastName}: </label>
            <div>{pregnancyDataForReport.patient.lastName || '-'}</div>
          </div>
          <div className='info-group'>
            <label>{translations.patient.property.birthDate}: </label>
            <div>{formatDate(pregnancyDataForReport.patient.birthDate)}</div>
          </div>
          <div className='info-group'>
            <label>{translations.patient.property.ageInYears}: </label>
            <div>{getAgeInYears(pregnancyDataForReport.patient.birthDate)}</div>
          </div>
          <div className='info-group'>
            <label>{translations.patient.property.racialOrigin}: </label>
            <div>{pregnancyDataForReport.patient.racialOrigin}</div>
          </div>

          <hr />

          {
            Object.keys(booleanMeasurements).map(m => (
              <BooleanMeasurement
                key={booleanMeasurements[m].id}
                value={booleanMeasurements[m]}
                characteristicName={m}
              />
            ))
          }

          {
            Object.keys(enumMeasurements).map(m => (
              <EnumMeasurement
                key={enumMeasurements[m].id}
                value={enumMeasurements[m]}
                characteristicName={m}
              />
            ))
          }

          {
            Object.keys(numericalMeasurements).map(m => (
              <NumericalMeasurement
                key={numericalMeasurements[m].id}
                value={numericalMeasurements[m]}
                characteristicName={m}
              />
            ))
          }

        </div>

        <br />
        <div>
          <Button
            bsStyle='primary'
            onClick={this.generatePDF}
          >
            Generiraj PDF izvješće
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ reports }) => {
  return {
    pregnancyDataForReport: reports.pregnancyDataForReport,
  };
};

const mapDispatchToProps = {
  generatePDFReport: reportActions.generatePDFReport,
  fetchPregnancyDataForReport: reportActions.fetchPregnancyDataForReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RiskEstimate));
