import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTranslations } from '../../../../../utils/translation.utils';
import {
  displayDateMeasured,
  displayBooleanMeasurementValue,
  displayNumericalMeasurementValue,
} from '../../../../../utils/measurement.utils';

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
      trimesterData: {
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
          <Row className='measurement'>
            <Col sm={3}>
              <label>Visina:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.Height, 'cm')}
                  </span>
                </div>
              </div>
              <div className='measurement__date'>
                <span>Datum mjerenja:</span>
                <span>{displayDateMeasured(numericalMeasurements.Height)}</span>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Težina:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.Weight, 'kg')}
                  </span>
                </div>
              </div>
              <div className='measurement__date'>
                <span>Datum mjerenja: </span>
                <span>{displayDateMeasured(numericalMeasurements.Weight)}</span>
              </div>
            </Col>
          </Row>

          <hr />

          <Row className='measurement'>
            <Col sm={3}>
              <label>Pušenje za vrijeme trudnoće:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayBooleanMeasurementValue(booleanMeasurements.SmokingDuringPregnancy)}
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
                Spremi promjene
              </Button>
              <Button
                bsStyle='default'
                onClick={this.closeEditMode}
              >
                Odustani
              </Button>
            </div> 
          }
        </Grid>
      </div>
    );
  }
}

export default MaternalCharacteristics;
