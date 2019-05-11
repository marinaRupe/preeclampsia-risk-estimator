import React, { Component } from 'react';
import { Grid, Row, Col, Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatDate } from '../../../utils/dateTime.utils';
import { getTranslations, getCharacteristicTranslation } from '../../../utils/translation.utils';
import { Characteristics } from '../../../constants/characteristics.constants';
import {
  displayBooleanValue,
} from '../../../utils/measurement.utils';

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
      pregnancy: {
        lastPeriodDate,
        lastPeriodDateIsReliable,
        birthDate,
        pregnancyType,
        conceptionMethod,
        numberOfPreviousBirths,
        numberOfPreviousPregnancies,
        hadPEInPreviousPregnancy,
        motherOfPatientHadPE
      } } = this.props;

    const translations = getTranslations();

    return (
      <div className='pregnancy__card'>
        <Grid>
          <Row>
            <h4 className='pregnancy__card--title'>
              <span>{translations.pregnancy.basicDetailsTitle}</span>
              {
                !isEditModeOn &&
                <i onClick={this.openEditMode} className='material-icons'>edit</i>
              }
            </h4>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Datum posljednje mjesečnice:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {formatDate(lastPeriodDate)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Datum posljednje mjesečnice pouzdan:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayBooleanValue(lastPeriodDateIsReliable)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Datum poroda:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {formatDate(birthDate)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>
                {getCharacteristicTranslation(Characteristics.PregnancyType)}:
              </label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {pregnancyType}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Vrsta začeća:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {conceptionMethod || '-'}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Broj ranijih trudnoća:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {numberOfPreviousPregnancies || '-'}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Broj poroda:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {numberOfPreviousBirths || '-'}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Preeklampsija u prethodnoj trudnoći:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayBooleanValue(hadPEInPreviousPregnancy)}
                  </span>
                </div>
              </div>
            </Col>
          </Row>

          <Row className='measurement'>
            <Col sm={3}>
              <label>Majka pacijentice imala preeklampsiju:</label>
            </Col>
            <Col sm={8}>
              <div className='measurement__info'>
                <div className='details'>
                  <span className='value'>
                    {displayBooleanValue(motherOfPatientHadPE)}
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

export default BasicInfo;
