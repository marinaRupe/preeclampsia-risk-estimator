import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  displayDateMeasured,
  displayNumericalMeasurementValue,
  exists,
} from '../../../../utils/measurement.utils';

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
      pregnancy: {
        numericalMeasurements,
      } } = this.props;

    return (
      <div className='pregnancy__card'>
        <Grid>
          <Row>
            <h4 className='pregnancy__card--title'>
              <span>Biokemijska mjerenja</span>
              {
                !isEditModeOn &&
                <i onClick={this.openEditMode} className='material-icons'>edit</i>
              }
            </h4>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Serum PLGF:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.SerumPLGFMoM, 'MoM')}
                  </span>
                </div>
              </div>
              {
                exists(numericalMeasurements.SerumPLGFMoM) &&
                <div className='measurement__date'>
                  <span>Datum mjerenja: </span>
                  <span>{displayDateMeasured(numericalMeasurements.SerumPLGFMoM)}</span>
                </div>
              }
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Serum PAPP-A:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.SerumPAPPAMoM, 'Mom')}
                  </span>
                </div>
              </div>
              {
                exists(numericalMeasurements.SerumPAPPAMoM) &&
                <div className='measurement__date'>
                  <span>Datum mjerenja: </span>
                  <span>{displayDateMeasured(numericalMeasurements.SerumPAPPAMoM)}</span>
                </div>
              }
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

export default BiophysicalMeasurements;
