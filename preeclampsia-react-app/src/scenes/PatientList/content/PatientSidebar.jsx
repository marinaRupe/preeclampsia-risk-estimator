import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { formatDate, getAgeInYears } from '../../../utils/dateTime.utils';
import { getTranslations } from '../../../utils/translation.utils';

class PatientSidebar extends Component {
  render() {
    const {
      patient,
      closeSidebar,
      openEditPatientModal,
      openDeletePatientModal,
    } = this.props;

    const translations = getTranslations();

    return (
      <div className='table-view--details'>
        <div>
          <div className='table-view--details__header'>
            <h4>{translations.patient.detailsTitle}</h4>
            <i className='material-icons' onClick={closeSidebar}>close</i>
          </div>
          <div>
            <div className='info-group'>
              <label>{translations.patient.property.firstName}: </label>
              <div>{patient.firstName || '-'}</div>
            </div>
            <div className='info-group'>
              <label>{translations.patient.property.lastName}: </label>
              <div>{patient.lastName || '-'}</div>
            </div>
            <div className='info-group'>
              <label>{translations.patient.property.birthDate}: </label>
              <div>{formatDate(patient.birthDate)}</div>
            </div>
            <div className='info-group'>
              <label>{translations.patient.property.ageInYears}: </label>
              <div>{getAgeInYears(patient.birthDate)}</div>
            </div>
            <div className='info-group'>
              <label>{translations.patient.property.racialOrigin}: </label>
              <div>{patient.racialOrigin}</div>
            </div>
          </div>
        </div>
        
        <div className='table-view--details__footer'>
          <Button
            bsStyle='primary'
            onClick={openEditPatientModal}
          >
            {translations.patient.action.edit}
          </Button>
          <Button
            bsStyle='danger'
            onClick={openDeletePatientModal}
          >
            {translations.patient.action.delete}
          </Button>
        </div>
      </div>
    );
  }
}

export default PatientSidebar;
