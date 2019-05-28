import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from '../../../components/Inputs/Input';
import Select from '../../../components/Inputs/Select';
import { RacialOriginTypes } from '../../../constants/patient.constants';
import { generateOptions } from '../../../utils/form.utils';
import { getTranslations, getLanguage } from '../../../utils/translation.utils';

class PatientForm extends Component {
  render() {
    const {
      onSubmit,
      error,
      disabled = {},
      buttons,
    } = this.props;

    const translations = getTranslations();
    const language = getLanguage();
    const racialOriginTypes =
      generateOptions(Object.values(RacialOriginTypes), 'key', 'key', language, true, translations.action.select);

    return (
      <form className='redux-form' onSubmit={onSubmit}>
        <div>
          <div className='redux-form__row'>
            <div className='w-50'>
              <label className='redux-form__label'>
                {translations.patient.property.firstName}
                <span className='required'>*</span>
              </label>
              <Field
                name='firstName'
                placeholder={translations.patient.placeholder.enterFirstName}
                component={Input}
                type='text'
                disabled={disabled.firstName}
                className='mr-20'
              />
            </div>

            <div className='w-50'>
              <label className='redux-form__label'>
                {translations.patient.property.lastName}
                <span className='required'>*</span>
              </label>
              <Field
                name='lastName'
                placeholder={translations.patient.placeholder.enterLastName}
                component={Input}
                type='text'
                disabled={disabled.lastName}
              />
            </div>
          </div>

          <div className='redux-form__row'>
            <div className='w-50'>
              <label className='redux-form__label'>
                {translations.patient.property.MBO}
                <span className='required'>*</span>
              </label>
              <Field
                name='MBO'
                placeholder={translations.patient.placeholder.enterMBO}
                component={Input}
                type='text'
                disabled={disabled.MBO}
                className='mr-20'
              />
            </div>

            <div className='w-50'>
              <label className='redux-form__label'>
                {translations.patient.property.birthDate}
                <span className='required'>*</span>
              </label>
              <Field
                name='birthDate'
                placeholder={translations.patient.placeholder.enterBirthDate}
                component={Input}
                type='date'
                disabled={disabled.birthDate}
              />
            </div>
          </div>

          <div className='redux-form__row'>
            <div className='w-50'>
              <label className='redux-form__label'>
                {translations.patient.property.racialOrigin}
                <span className='required'>*</span>
              </label>
              <Field
                name='racialOrigin'
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
