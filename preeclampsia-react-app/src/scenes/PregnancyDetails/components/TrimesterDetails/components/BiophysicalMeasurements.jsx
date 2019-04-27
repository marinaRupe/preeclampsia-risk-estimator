import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
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

    return (
      <div className='pregnancy__card'>
        <Grid>
          <Row>
            <h4 className='pregnancy__card--title'>
              <span>Biofizička mjerenja</span>
              {
                !isEditModeOn &&
                <i onClick={this.openEditMode} className='material-icons'>edit</i>
              }
            </h4>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Srednji arterijski tlak:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.MeanArterialPressure, 'mmHg')}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Srednji PI maternične arterije:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.MeanUterineArteryPI)}
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

export default BiophysicalMeasurements;
