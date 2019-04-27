import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { APP } from '../../../constants/routes';
import { getLoginDataFromLocalStorage } from '../../../utils/auth.utils';

class Register extends Component {
  render() {
    const { token } = getLoginDataFromLocalStorage();
    
    if (token) {
      return <Redirect to={APP.ROOT} />;
    }

    return (
      <div>
        REGISTER
      </div>
    );
  }
}

export default Register;
