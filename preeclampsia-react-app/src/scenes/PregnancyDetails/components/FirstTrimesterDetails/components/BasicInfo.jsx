import React, { Component } from 'react';
import { Grid, Row, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTranslations } from '../../../../../utils/translation.utils';
import DateDisplay from '../../../../../components/Measurement/DateDisplay';
import GestationalAgeDisplay from '../../../../../components/Measurement/GestationalAgeDisplay';
import NumericalMeasurement from '../../../../../components/Measurement/NumericalMeasurement';

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
      medicalExaminationData: {
        gestationalAgeByUltrasoundWeeks,
        gestationalAgeByUltrasoundDays,
        gestationalAgeOnBloodTestWeeks,
        gestationalAgeOnBloodTestDays,
        ultrasoundDate,
        bloodTestDate,
        numericalMeasurements,
      } } = this.props;

    const translations = getTranslations();

    return (
      <div className='pregnancy__card'>
        <Grid>
          <Row>
            <h4 className='pregnancy__card--title'>
              <span>{translations.pregnancy.trimestersBasicDetails}</span>
              {
                !isEditModeOn &&
                <i onClick={this.openEditMode} className='material-icons'>edit</i>
              }
            </h4>
          </Row>

          <DateDisplay
            label='Datum vađenja krvi'
            value={bloodTestDate}
          />

          <DateDisplay
            label='Datum ultrazvuka'
            value={ultrasoundDate}
          />

          <NumericalMeasurement
            characteristicName='FetalCrownRumpLength'
            value={numericalMeasurements.FetalCrownRumpLength}
            info='45 - 85 mm'
          />

          <GestationalAgeDisplay
            label='Gestacijska dob na ultrazvuku'
            weeks={gestationalAgeByUltrasoundWeeks}
            days={gestationalAgeByUltrasoundDays}
          />

          <GestationalAgeDisplay
            label='Gestacijska dob na dan vađenja krvi'
            weeks={gestationalAgeOnBloodTestWeeks}
            days={gestationalAgeOnBloodTestDays}
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
