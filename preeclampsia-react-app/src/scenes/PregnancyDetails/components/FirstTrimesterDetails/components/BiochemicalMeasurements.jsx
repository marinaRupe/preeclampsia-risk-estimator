import React, { Component } from 'react';
import { Grid, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTranslations } from '../../../../../utils/translation.utils';
import NumericalMeasurement from '../../../../../components/Measurement/NumericalMeasurement';

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

  saveChanges = () => {
    this.closeEditMode();
  };

  render() {
    const { isEditModeOn } = this.state;
    const {
      medicalExaminationData: {
        numericalMeasurements,
      } } = this.props;
    
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

          <NumericalMeasurement
            characteristicName='SerumPLGF'
            value={numericalMeasurements.SerumPLGF}
          />

          <NumericalMeasurement
            characteristicName='SerumPAPPA'
            value={numericalMeasurements.SerumPAPPA}
          />

          {
            isEditModeOn &&
            <div>
              <Button
                bsStyle='primary'
                onClick={this.saveChanges}
              >
                {translations.pregnancy.action.save}
              </Button>
              <Button
                bsStyle='default'
                onClick={this.closeEditMode}
              >
                {translations.action.cancel}
              </Button>
            </div> 
          }
        </Grid>
      </div>
    );
  }
}

export default BiophysicalMeasurements;
