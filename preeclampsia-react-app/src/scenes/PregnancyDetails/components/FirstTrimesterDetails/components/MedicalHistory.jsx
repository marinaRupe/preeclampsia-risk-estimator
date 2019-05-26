import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTranslations } from '../../../../../utils/translation.utils';
import BooleanMeasurement from '../../../../../components/Measurement/BooleanMeasurement';
import EnumMeasurement from '../../../../../components/Measurement/EnumMeasurement';

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
      medicalExaminationData: {
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

          <EnumMeasurement
            characteristicName='HypertensionType'
            value={enumMeasurements.HypertensionType}
          />

          <EnumMeasurement
            characteristicName='DiabetesType'
            value={enumMeasurements.DiabetesType}
          />

          <BooleanMeasurement
            characteristicName='SystemicLupusErythematosus'
            value={booleanMeasurements.SystemicLupusErythematosus}
          />

          <BooleanMeasurement
            characteristicName='AntiPhospholipidSyndrome'
            value={booleanMeasurements.AntiPhospholipidSyndrome}
          />

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

export default MedicalHistory;
