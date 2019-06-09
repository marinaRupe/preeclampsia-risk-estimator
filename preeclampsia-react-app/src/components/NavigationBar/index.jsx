import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { APP } from 'constants/routes';
import { getTranslations } from 'utils/translation.utils';
import { withPermission, isUserLoggedIn } from 'utils/auth.utils';
import * as userActions from 'redux/actions/user.actions';
import { userRoles } from 'constants/roles.constants';
import LanguageSelector from '../LanguageSelector';

class NavigationBar extends Component {
  render() {
    const { logoutUser } = this.props;

    const translations = getTranslations();

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <a href={APP.ROOT} className='nav-logo'>
              <i className='material-icons'>local_hospital</i>
              <span>Preeclampsia Risk Estimator</span>
            </a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav className='w-50'>
          {
            withPermission((
              <NavItem eventKey={1} href={APP.PATIENTS}>
                {translations.patient.listTitle}
              </NavItem>
            ))
          }
          {
            withPermission((
              <NavItem eventKey={2} href={APP.STATISTICS}>
                {translations.statistics.title}
              </NavItem>
            ))
          }
          {
            withPermission((
              <NavItem eventKey={3} href={APP.USERS}>
                {translations.user.listTitle}
              </NavItem>
            ), null, true, [userRoles.Admin.value])
          }
          {
            !isUserLoggedIn() &&
            <NavItem eventKey={10} href={APP.AUTH.LOGIN}>
              {translations.login.title}
            </NavItem>
          }
        </Nav>

        {
          isUserLoggedIn() &&
          <Nav className='w-20 align-horizontal--center'>
            <NavDropdown eventKey={11} title={<i className='material-icons'>person</i>} id='basic-nav-dropdown'>
              <MenuItem eventKey='11.1'>
                <div onClick={logoutUser}>{translations.logout.title}</div>
              </MenuItem>          
            </NavDropdown> 
          </Nav>
        }
        <Nav className='w-10'>
          <LanguageSelector />
        </Nav>
      </Navbar>
    );
  } 
};

const mapDispatchToProps = {
  logoutUser: userActions.logoutUser,
};

export default connect(null, mapDispatchToProps)(NavigationBar);
