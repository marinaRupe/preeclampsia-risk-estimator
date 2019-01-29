import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getToken } from '../../../utils/auth.utils';

export default function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      { ...rest }
      render={props => (!!getToken()
        ? <Component { ...props } />
        : <Redirect to='/login' />
      )}
    />
  );
}
