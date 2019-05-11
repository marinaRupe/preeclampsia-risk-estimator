import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { formatDate, getAgeInYears } from '../../../utils/dateTime.utils';

class PatientSidebar extends Component {
  render() {
    const {
      patient,
      closeSidebar,
      openEditPatientModal,
      openDeletePatientModal
    } = this.props;

    return (
      <div className='table-view--details'>
        <div>
          <div className='table-view--details__header'>
            <h4>Detalji o pacijentu</h4>
            <i className='material-icons' onClick={closeSidebar}>close</i>
          </div>
          <div>
            <div className='info-group'>
              <label>Ime: </label>
              <div>{patient.firstName || '-'}</div>
            </div>
            <div className='info-group'>
              <label>Prezime: </label>
              <div>{patient.lastName || '-'}</div>
            </div>
            <div className='info-group'>
              <label>Datum rođenja: </label>
              <div>{formatDate(patient.birthDate)}</div>
            </div>
            <div className='info-group'>
              <label>Starost u godinama: </label>
              <div>{getAgeInYears(patient.birthDate)}</div>
            </div>
            <div className='info-group'>
              <label>Etnička skupina: </label>
              <div>{patient.racialOrigin}</div>
            </div>
          </div>
        </div>
        
        <div className='table-view--details__footer'>
          <Button
            bsStyle='primary'
            onClick={openEditPatientModal}
          >
            Uredi podatke
          </Button>
          <Button
            bsStyle='danger'
            onClick={openDeletePatientModal}
          >
            Izbriši pacijenta
          </Button>
        </div>
      </div>
    );
  }
}

export default PatientSidebar;