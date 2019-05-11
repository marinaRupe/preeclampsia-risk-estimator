import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from '../../../components/Inputs/Input';
import { getTranslations } from '../../../utils/translation.utils';

class PasswordInputs extends Component {
  render() {
    const {
      disabled = {},
    } = this.props;

    const translations = getTranslations();

    return (
      <div className='redux-form__row'>
        <div className='w-50'>
          <label className='redux-form__label'>
            {translations.user.property.password}
            <span className='required'>*</span>
          </label>
          <Field
            name='password'
            placeholder={translations.user.placeholder.enterPassword}
            component={Input}
            type='password'
            disabled={disabled.password}
            className='mr-20'
          />
        </div>

        <div className='w-50'>
          <label className='redux-form__label'>
            {translations.user.property.repeatedPassword}
            <span className='required'>*</span>
          </label>
          <Field
            name='repeatedPassword'
            placeholder={translations.user.placeholder.enterRepeatedPassword}
            component={Input}
            type='password'
            disabled={disabled.repeatedPassword}
            className='mr-20'
          />
        </div>
      </div>
    );
  }
}

export default PasswordInputs;
