import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { getTranslations } from '../../../../utils/translation.utils';
import Spinner from '../../../../components/Spinner';
import MaternalCharacteristics from './components/MaternalCharacteristics';
import MedicalHistory from './components/MedicalHistory';
import BiophysicalMeasurements from './components/BiophysicalMeasurements';
import BiochemicalMeasurements from './components/BiochemicalMeasurements';
import BasicInfo from './components/BasicInfo';

class FirstTrimesterDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      isEditModeOn: false,
    };
  }
  
  render() {
    const { medicalExaminations, calculateRisk } = this.props;
    const { isLoading } = this.state;
    const trimesterNumber = 1;

    const translations = getTranslations();

    if (isLoading || !medicalExaminations) {
      return (
        <div className='pregnancy__trimester'>
          <h3>{translations.word.trimester} {trimesterNumber}</h3>
          <div className='align-horizontal--center'>
            <Spinner />
          </div>
        </div>
      );
    }

    return (
      <div className='pregnancy__trimester'>
        <h3>{translations.word.trimester} {trimesterNumber}</h3>
      
        {
          medicalExaminations.map(medicalExamination => (
            <div key={medicalExamination.id}>
              <div>
                <BasicInfo medicalExaminationData={medicalExamination} />
                <MaternalCharacteristics medicalExaminationData={medicalExamination} />
                <MedicalHistory medicalExaminationData={medicalExamination} />
                <BiophysicalMeasurements medicalExaminationData={medicalExamination} />
                <BiochemicalMeasurements medicalExaminationData={medicalExamination} />
              </div>
              <Button
                bsStyle='primary'
                onClick={calculateRisk.bind(null, medicalExamination.id)}
              >
                {translations.risk.calculateRisk}
              </Button>
            </div>
          ))
        }
      </div>
    );
  }
}

export default FirstTrimesterDetails;
