import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTranslations } from '../../../../../utils/translation.utils';
import {
  displayBooleanMeasurementValue,
  displayEnumMeasurementValue,
} from '../../../../../utils/measurement.utils';

class MedicalHistory extends Component {
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
        note,
        enumMeasurements,
        booleanMeasurements,
      } } = this.props;

    const translations = getTranslations();

    return (
      <div className='pregnancy__card'>
        <Grid>
          <Row>
            <h4 className='pregnancy__card--title'>
              <span>{translations.pregnancy.medicalHistoryTitle}</span>
              {
                !isEditModeOn &&
                <i onClick={this.openEditMode} className='material-icons'>edit</i>
              }
            </h4>
          </Row>

          {
            booleanMeasurements.Hypertension &&
            <Row className='measurement'>
              <Col sm={3}>
                <label>Hipertenzija:</label>
              </Col>
              <Col sm={8}>
                <div className='measurement__info'>
                  <div className='details'>
                    <span className='value'>
                      {displayEnumMeasurementValue(enumMeasurements.HypertensionType)}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          }

          {
            enumMeasurements.Diabetes &&
            <Row className='measurement'>
              <Col sm={3}>
                <label>Dijabetes:</label>
              </Col>
              <Col sm={8}>
                <div className='measurement__info'>
                  <div className='details'>
                    <span className='value'>
                      {displayEnumMeasurementValue(enumMeasurements.DiabetesType)}
                    </span>
                  </div>
                </div>
              </Col>
            </Row>
          }

          <Row className='measurement'>
            <Col sm={3}>
              <label>Sistemski eritemski lupus:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayBooleanMeasurementValue(booleanMeasurements.SystemicLupusErythematosus)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Antifosfolipidni sindrom:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayBooleanMeasurementValue(booleanMeasurements.AntiPhospholipidSyndrome)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Napomena:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {note || '-'}
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

export default MedicalHistory;
