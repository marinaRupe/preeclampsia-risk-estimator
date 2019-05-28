import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTranslations } from '../../../../../utils/translation.utils';
import BooleanMeasurement from '../../../../../components/Measurement/BooleanMeasurement';
import NumericalMeasurement from '../../../../../components/Measurement/NumericalMeasurement';

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

  saveChanges = () => {
    this.closeEditMode();
  };

  render() {
    const { isEditModeOn } = this.state;
    const {
      medicalExaminationData: {
        numericalMeasurements,
        booleanMeasurements,
      } } = this.props;

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

export default MaternalCharacteristics;
