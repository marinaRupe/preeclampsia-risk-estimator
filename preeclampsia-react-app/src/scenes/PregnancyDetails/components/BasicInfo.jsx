import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { formatDate } from '../../../utils/dateTime.utils';
import { getTranslations } from '../../../utils/translation.utils';
import DateDisplay from '../../../components/Measurement/DateDisplay';
import BooleanMeasurement from '../../../components/Measurement/BooleanMeasurement';
import EnumMeasurement from '../../../components/Measurement/EnumMeasurement';
import NumericalMeasurement from '../../../components/Measurement/NumericalMeasurement';

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
        deliveryDate,
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

          <DateDisplay
            label='Datum posljednje mjesečnice'
            value={lastPeriodDate}
          />

          <BooleanMeasurement
            label='Datum posljednje mjesečnice pouzdan'
            value={lastPeriodDateIsReliable}
          />

          <DateDisplay
            label='Datum poroda'
            value={deliveryDate}
          />

          <EnumMeasurement
            characteristicName='PregnancyType'
            value={pregnancyType}
          />

          <EnumMeasurement
            characteristicName='ConceptionMethod'
            value={conceptionMethod}
          />

          <NumericalMeasurement
            label='Broj ranijih trudnoća'
            value={numberOfPreviousPregnancies}
          />

          <NumericalMeasurement
            label='Broj poroda'
            value={numberOfPreviousBirths}
          />

          <BooleanMeasurement
            label='Preeklampsija u prethodnoj trudnoći'
            value={hadPEInPreviousPregnancy}
          />

          <BooleanMeasurement
            characteristicName='MotherOfPatientHadPE'
            value={motherOfPatientHadPE}
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

export default BasicInfo;
