import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from 'components/Inputs/Input';
import { getTranslations } from 'utils/translation.utils';

class FirstTrimesterBasicInfoForm extends Component {
  render() {
    const {
      onSubmit,
      error,
      disabled = {},
      buttons,
    } = this.props;

    const translations = getTranslations();

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
        </div>
        {error && <div className='redux-form__error'>{error}</div>}      
        {buttons}
      </form>
    );
  }
}

export default FirstTrimesterBasicInfoForm;
