import React, { Component } from 'react';
import PasswordInputs from '../PasswordInputs';

class UserPasswordForm extends Component {
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
          <PasswordInputs disabled={disabled} />
        </div>
        {error && <div className='redux-form__error'>{error}</div>}      
        <div>
          {buttons}
        </div>
      </form>
    );
  }
}

export default UserPasswordForm;
