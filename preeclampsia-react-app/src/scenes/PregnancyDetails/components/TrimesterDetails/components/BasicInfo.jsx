import React, { Component } from 'react';
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatDate } from '../../../../../utils/dateTime.utils';
import {
  displayEnumMeasurementValue,
  displayBooleanValue,
  displayNumericalMeasurementValue,
} from '../../../../../utils/measurement.utils';

class BasicInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditModeOn: false,
    };
  }

  gestationalAge = (CRL) => {
    const gestationalAgeInDays = Math.pow((CRL * 1.037), 0.5) * 8.052 + 23.73;
    const weeks = Math.floor(gestationalAgeInDays / 7);
    const days = Math.floor(gestationalAgeInDays % 7);
    return <span>{weeks}<sup>+{days}</sup></span>;
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
        gestationalAgeByUltrasoundWeeks,
        gestationalAgeByUltrasoundDays,
        ultrasoundDate,
        bloodTestDate,
        numericalMeasurements,
      } } = this.props;

    return (
      <div className='pregnancy__card'>
        <Grid>
          <Row>
            <h4 className='pregnancy__card--title'>
              <span>Osnovni podaci</span>
              {
                !isEditModeOn &&
                <i onClick={this.openEditMode} className='material-icons'>edit</i>
              }
            </h4>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Datum vađenja krvi:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {formatDate(bloodTestDate)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Datum ultrazvuka:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {formatDate(ultrasoundDate)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Duljina fetalne krune:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayNumericalMeasurementValue(numericalMeasurements.FetalCrownRumpLength, 'mm')}
                  </span>
                  <OverlayTrigger
                    placement='right'
                    overlay={(
                      <Tooltip className='in' id='fetal-crown-tooltip'>
                        <span className='constraint'>45 - 85 mm</span>
                      </Tooltip>
                    )}
                  >
                    <i className='material-icons'>info</i>
                  </OverlayTrigger>
                </div>
              </div>
              {
                (numericalMeasurements.FetalCrownRumpLength && numericalMeasurements.FetalCrownRumpLength.value) &&
                <div className='measurement__additional-info'>
                  <span>Procjenjena gestacijska dob:</span>
                  <span>
                    {gestationalAgeByUltrasoundWeeks}<sup>+{gestationalAgeByUltrasoundDays}</sup>
                  </span>
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

export default BasicInfo;
