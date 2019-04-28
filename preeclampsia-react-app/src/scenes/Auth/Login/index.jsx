import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { APP } from '../../../constants/routes';
import * as userActions from '../../../redux/actions/user.actions';
import { LOGIN_FORM } from '../../../redux/forms';
import { getLoginDataFromLocalStorage } from '../../../utils/auth.utils';
import Input from '../../../components/Inputs/Input';

class Login extends Component {
  render() {
    const { token } = getLoginDataFromLocalStorage();
    const { handleSubmit, error } = this.props;

    if (token) {
      return <Redirect to={APP.ROOT} />;
    }

    return (
      <div className='auth-page'>
        <div className='auth-page__title'>Prijava u sustav</div>
        <div>
          <form className='redux-form' onSubmit={handleSubmit}>
            <div>
              <div className='redux-form__row'>
                <label className='redux-form__label'>
                  E-mail
                </label>
                <Field
                  name='email'
                  placeholder='Unesi E-mail'
                  component={Input}
                  type='text'
                />
              </div>
              <div className='redux-form__row'>
                <label className='redux-form__label'>
                  Lozinka
                </label>
                <Field
                  name='password'
                  placeholder='Unesi lozinku'
                  component={Input}
                  type='password'
                />
              </div>
            </div>
            {error && <div className='redux-form__error'>{error}</div>}      
            <div>
              <Button bsStyle='primary' type='submit'>
                Prijavi se
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
