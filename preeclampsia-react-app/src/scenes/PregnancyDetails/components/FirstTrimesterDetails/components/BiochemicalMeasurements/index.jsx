import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { extractMeasurementsInitialValues } from '../../../../../../utils/measurement.utils';
import { getTranslations } from '../../../../../../utils/translation.utils';
import NumericalMeasurement from '../../../../../../components/Measurement/NumericalMeasurement';
import BiochemicalMeasurementsForm from './BiochemicalMeasurementsForm';

class BiophysicalMeasurements extends Component {
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
    const numericalCharacteristics = ['SerumPLGF', 'SerumPAPPA'];

    return extractMeasurementsInitialValues(
      medicalExaminationData,
      [],
      [],
      numericalCharacteristics,
    );
  }

  render() {
    const { isEditModeOn } = this.state;
    const {
      medicalExaminationData: {
        numericalMeasurements,
      }
    } = this.props;
    
    const translations = getTranslations();

    return (
      <div className='pregnancy__card'>
        <Grid>
          <Row>
            <h4 className='pregnancy__card--title'>
              <span>{translations.pregnancy.biochemicalMeasurementsTitle}</span>
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
                  characteristicName='SerumPLGF'
                  value={numericalMeasurements.SerumPLGF}
                />

                <NumericalMeasurement
                  characteristicName='SerumPAPPA'
                  value={numericalMeasurements.SerumPAPPA}
                />
              </div>
              :
              <BiochemicalMeasurementsForm
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

export default BiophysicalMeasurements;
