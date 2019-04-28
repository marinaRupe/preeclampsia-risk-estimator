import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from '../../../components/Inputs/Input';
import Select from '../../../components/Inputs/Select';
import { userRoles } from '../../../constants/roles.constants';
import { generateOptions } from '../../../utils/form.utils';

class UserForm extends Component {
  render() {
    const {
      onSubmit,
      error,
      disabled = {},
      buttons,
    } = this.props;

    const userRolesOptions = generateOptions(Object.values(userRoles), 'key', 'value', 'hr', true, 'Odaberi');

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
                E-mail
                <span className='required'>*</span>
              </label>
              <Field
                name='email'
                placeholder='Unesi E-mail'
                component={Input}
                type='text'
                disabled={disabled.MBO}
                className='mr-20'
              />
            </div>

            <div className='w-50'>
              <label className='redux-form__label'>
                Uloga
                <span className='required'>*</span>
              </label>
              <Field
                name='role'
                component={Select}
                disabled={disabled.role}
                children={userRolesOptions}
                className='mr-20'
              />
            </div>
          </div>

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

        </div>
        {error && <div className='redux-form__error'>{error}</div>}      
        <div>
          {buttons}
        </div>
      </form>
    );
  }
}

export default UserForm;
