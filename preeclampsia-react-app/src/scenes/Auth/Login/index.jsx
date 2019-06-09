import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { APP } from 'constants/routes';
import * as userActions from 'redux/actions/user.actions';
import { LOGIN_FORM } from 'redux/forms';
import { getLoginDataFromLocalStorage } from 'utils/auth.utils';
import { getTranslations } from 'utils/translation.utils';
import Input from 'components/Inputs/Input';

class Login extends Component {
  render() {
    const { token } = getLoginDataFromLocalStorage();
    const { handleSubmit, error } = this.props;

    const translations = getTranslations();

    if (token) {
      return <Redirect to={APP.ROOT} />;
    }

    return (
      <div className='auth-page'>
        <div className='auth-page__title'>{translations.login.titleLong}</div>
        <div>
          <form className='redux-form' onSubmit={handleSubmit}>
            <div>
              <div className='redux-form__row'>
                <label className='redux-form__label'>
                  {translations.user.property.email}
                </label>
                <Field
                  name='email'
                  placeholder={translations.user.placeholder.enterEmail}
                  component={Input}
                  type='text'
                />
              </div>
              <div className='redux-form__row'>
                <label className='redux-form__label'>
                  {translations.user.property.password}
                </label>
                <Field
                  name='password'
                  placeholder={translations.user.placeholder.enterPassword}
                  component={Input}
                  type='password'
                />
              </div>
            </div>
            {error && <div className='redux-form__error'>{error}</div>}      
            <div>
              <Button bsStyle='primary' type='submit'>
                {translations.login.action}
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggedIn: state.users.auth.loggedIn,
  };
};

const mapDispatchToProps = {
  onSubmit: userActions.loginUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
  form: LOGIN_FORM,
})(Login));
