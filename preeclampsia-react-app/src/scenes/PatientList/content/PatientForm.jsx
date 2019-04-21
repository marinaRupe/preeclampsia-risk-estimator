import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from '../../../components/Inputs/Input';

class PatientForm extends Component {
  render() {
    const {
      onSubmit,
      error,
      disabled = {},
      buttons,
    } = this.props;

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
