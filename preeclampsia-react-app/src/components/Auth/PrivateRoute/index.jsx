import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLoginDataFromLocalStorage, getAllRoles, isRoleAllowed } from '../../../utils/auth.utils';

export default function PrivateRoute({ component: Component, allowedRoles = getAllRoles(), ...rest }) {
  const { token } = getLoginDataFromLocalStorage();
  return (
    <Route
      { ...rest }
      render={props => (!!token && isRoleAllowed(allowedRoles)
        ? <Component { ...props } />
        : <Redirect to='/login' />
      )}
    />
  );
}
