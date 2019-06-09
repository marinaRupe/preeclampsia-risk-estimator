import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/Auth/PrivateRoute';
import Login from './scenes/Auth/Login';
import Error404 from './scenes/Error/Error404';
import PatientList from './scenes/PatientList';
import PatientData from './scenes/PatientData';
import PregnancyDetails from './scenes/PregnancyDetails';
import RiskEstimate from './scenes/RiskEstimate';
import Statistics from './scenes/Statistics';
import UserList from './scenes/UserList';
import Home from './scenes/Home';
import NavigationBar from './components/NavigationBar';
import { APP } from './constants/routes';
import { userRoles } from './constants/roles.constants';
import history from './history';
import './styles/App.css';

class App extends Component {
	render() {
		return (
			<Router history={history}>
				<div>
					<NavigationBar />
					<Switch>
						<Route exact path={APP.AUTH.LOGIN} component={Login} />
						<Route exact path={APP.NOT_FOUND_ERROR} component={Error404} />
            
						<Route exact path={APP.ROOT} component={Home}/>

						<PrivateRoute
							path={APP.RISK_ESTIMATE()}
							component={RiskEstimate}
						/>
						<PrivateRoute
							path={APP.PATIENT.PREGNANCY_DETAILS()}
							component={PregnancyDetails}
						/>
						<PrivateRoute
							path={APP.PATIENT.DETAILS()}
							component={PatientData}
						/>
						<PrivateRoute
							path={APP.PATIENTS}
							component={PatientList}
						/>
						<PrivateRoute
							path={APP.STATISTICS}
							component={Statistics}
						/>
						<PrivateRoute
							path={APP.USERS}
							component={UserList}
							allowedRoles={[userRoles.Admin.value]}
						/>

						<Route path='*' component={Error404} />
					</Switch>
				</div>
			</Router>
		);
	}
}

export default App;
