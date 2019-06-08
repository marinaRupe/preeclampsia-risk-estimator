import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { extractMeasurementsInitialValues } from '../../../../../../utils/measurement.utils';
import { getTranslations } from '../../../../../../utils/translation.utils';
import BooleanMeasurement from '../../../../../../components/Measurement/BooleanMeasurement';
import NumericalMeasurement from '../../../../../../components/Measurement/NumericalMeasurement';
import MaternalCharacteristicsForm from './MaternalCharacteristicsForm';

class MaternalCharacteristics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditModeOn: false,
    };
  }

  openEditMode = () => {
    this.setState({ isEditModeOn: true });
  }

  closeEditMode = () => {
    this.setState({ isEditModeOn: false });
  }

  saveChanges = (measurementsData) => {
    const { medicalExaminationData, updateMeasurements } = this.props;
    updateMeasurements(medicalExaminationData.id, measurementsData);
    this.closeEditMode();
  };

  getEditMeasurementsInitialValues = () => {
    const { medicalExaminationData } = this.props;
    const numericalCharacteristics = ['Height', 'Weight'];
    const booleanCharacteristics = ['SmokingDuringPregnancy'];

    return extractMeasurementsInitialValues(
      medicalExaminationData,
      booleanCharacteristics,
      [],
      numericalCharacteristics,
    );
  }

  render() {
    const { isEditModeOn } = this.state;
    const {
      medicalExaminationData: {
        numericalMeasurements,
        booleanMeasurements,
      }
    } = this.props;

    const translations = getTranslations();

    return (
      <div className='pregnancy__card'>
        <Grid>
          <Row>
            <h4 className='pregnancy__card--title'>
              <span>{translations.pregnancy.maternalCharacteristicsTitle}</span>
              {
                !isEditModeOn &&
                <i onClick={this.openEditMode} className='material-icons'>edit</i>
              }
            </h4>
          </Row>
          
          {
            !isEditModeOn
              ?
              <div>
                <NumericalMeasurement
                  characteristicName='Height'
                  value={numericalMeasurements.Height}
                />

                <NumericalMeasurement
                  characteristicName='Weight'
                  value={numericalMeasurements.Weight}
                />

                <hr />

                <BooleanMeasurement
                  characteristicName='SmokingDuringPregnancy'
                  value={booleanMeasurements.SmokingDuringPregnancy}
                />
              </div>
              :
              <MaternalCharacteristicsForm
                onSubmit={this.saveChanges}
                initialValues={this.getEditMeasurementsInitialValues()}
                closeEditMode={this.closeEditMode}
              />
          }
        </Grid>
      </div>
    );
  }
}

export default MaternalCharacteristics;
