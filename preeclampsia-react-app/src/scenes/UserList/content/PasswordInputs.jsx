import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from '../../../components/Inputs/Input';

class PasswordInputs extends Component {
  render() {
    const {
      disabled = {},
    } = this.props;

    return (
      <div className='redux-form__row'>
        <div className='w-50'>
          <label className='redux-form__label'>
            Lozinka
            <span className='required'>*</span>
          </label>
          <Field
            name='password'
            placeholder='Unesi lozinku'
            component={Input}
            type='password'
            disabled={disabled.password}
            className='mr-20'
          />
        </div>

        <div className='w-50'>
          <label className='redux-form__label'>
            Ponovljena lozinka
            <span className='required'>*</span>
          </label>
          <Field
            name='repeatedPassword'
            placeholder='Ponovi lozinku'
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
