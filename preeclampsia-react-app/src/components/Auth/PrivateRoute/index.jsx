import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { getLoginDataFromLocalStorage } from '../../../utils/auth.utils';

export default function PrivateRoute({ component: Component, ...rest }) {
  const { token } = getLoginDataFromLocalStorage();
  return (
    <Route
      { ...rest }
      render={props => (!!token
        ? <Component { ...props } />
        : <Redirect to='/login' />
      )}
    />
  );
}
