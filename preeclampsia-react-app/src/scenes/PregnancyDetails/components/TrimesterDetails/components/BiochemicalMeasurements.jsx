import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Characteristics } from '../../../../../constants/characteristics.constants';
import { getTranslations, getCharacteristicTranslation } from '../../../../../utils/translation.utils';
import {
  displayNumericalMeasurementValue,
} from '../../../../../utils/measurement.utils';

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
      trimesterData: {
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

          <Row className='measurement'>
            <Col sm={3}>
              <label>
                {getCharacteristicTranslation(Characteristics.SerumPLGF)}:
              </label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.SerumPLGF, 'pg/ml')}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>
                {getCharacteristicTranslation(Characteristics.SerumPAPPA)}:
              </label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.SerumPAPPA, 'mU/L')}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
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
