import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as userActions from 'redux/users/user.actions';
import { getLoginDataFromLocalStorage, getAllRoles, isRoleAllowed } from 'utils/auth.utils';

class PrivateRoute extends Component {
	componentDidMount() {
		const { token, user } = getLoginDataFromLocalStorage();
		const { loggedIn, updateUser } = this.props;

		if (!!token && !loggedIn) {
			updateUser(user);
		}
	}

	render() {
		const {
			component: Component,
			allowedRoles = getAllRoles(),
			...rest
		} = this.props;
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
}

const mapStateToProps = state => {
	return {
		loggedIn: state.users.auth.loggedIn,
	};
};

const mapDispatchToProps = {
	updateUser: userActions.updateCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
