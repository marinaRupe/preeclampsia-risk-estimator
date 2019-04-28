import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from '../../../components/Inputs/Input';
import Select from '../../../components/Inputs/Select';
import { RacialOriginTypes } from '../../../constants/patient.constants';
import { generateOptions } from '../../../utils/form.utils';

class PatientForm extends Component {
  render() {
    const {
      onSubmit,
      error,
      disabled = {},
      buttons,
    } = this.props;

    const racialOriginTypes = generateOptions(Object.values(RacialOriginTypes), 'key', 'hr', 'hr', true, 'Odaberi');

    return (
      <form className='redux-form' onSubmit={onSubmit}>
        <div>
          <div className='redux-form__row'>
            <div className='w-50'>
              <label className='redux-form__label'>
                Ime
                <span className='required'>*</span>
              </label>
              <Field
                name='firstName'
                placeholder='Unesi ime'
                component={Input}
                type='text'
                disabled={disabled.firstName}
                className='mr-20'
              />
            </div>

            <div className='w-50'>
              <label className='redux-form__label'>
                Prezime
                <span className='required'>*</span>
              </label>
              <Field
                name='lastName'
                placeholder='Unesi prezime'
                component={Input}
                type='text'
                disabled={disabled.lastName}
              />
            </div>
          </div>

          <div className='redux-form__row'>
            <div className='w-50'>
              <label className='redux-form__label'>
                MBO
                <span className='required'>*</span>
              </label>
              <Field
                name='MBO'
                placeholder='Unesi MBO'
                component={Input}
                type='text'
                disabled={disabled.MBO}
                className='mr-20'
              />
            </div>

            <div className='w-50'>
              <label className='redux-form__label'>
                Datum rođenja
                <span className='required'>*</span>
              </label>
              <Field
                name='birthDate'
                placeholder='Unesi datum rođenja'
                component={Input}
                type='date'
                disabled={disabled.birthDate}
              />
            </div>
          </div>

          <div className='redux-form__row'>
            <div className='w-50'>
              <label className='redux-form__label'>
                Etnička skupina
                <span className='required'>*</span>
              </label>
              <Field
                name='racialOrigin'
                placeholder='Unesi etničku skupinu'
                component={Select}
                disabled={disabled.racialOrigin}
                children={racialOriginTypes}
                className='mr-20'
              />
            </div>
          </div>

        </div>
        {error && <div className='redux-form__error'>{error}</div>}      
        <div>
          {buttons}
        </div>
      </form>
    );
  }
}

export default PatientForm;
