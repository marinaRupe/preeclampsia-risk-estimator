import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { APP } from '../../../constants/routes';
import { getToken } from '../../../utils/auth.utils';

class Register extends Component {
  render() {
    if (getToken()) {
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
