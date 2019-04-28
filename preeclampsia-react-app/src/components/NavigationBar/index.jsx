import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { APP } from '../../constants/routes';
import { withPermission, isUserLoggedIn } from '../../utils/auth.utils';
import * as userActions from '../../redux/actions/user.actions';
import { userRoles } from '../../constants/roles.constants';

class NavigationBar extends Component {
  render() {
    const { logoutUser } = this.props;

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
        <Nav className='w-80'>
          {
            withPermission((
              <NavItem eventKey={1} href={APP.PATIENTS}>
                Lista pacijenata
              </NavItem>
            ))
          }
          {
            withPermission((
              <NavItem eventKey={2} href={APP.STATISTICS}>
                Statistika
              </NavItem>
            ))
          }
          {
            withPermission((
              <NavItem eventKey={3} href={APP.USERS}>
                Lista korisnika
              </NavItem>
            ), null, true, [userRoles.Admin.value])
          }
          {
            !isUserLoggedIn() &&
            <NavItem eventKey={10} href={APP.AUTH.LOGIN}>
              Prijava
            </NavItem>
          }
        </Nav>

        {
          isUserLoggedIn() &&
          <Nav className='w-20'>
            <NavDropdown eventKey={11} title={<i className='material-icons'>person</i>} id='basic-nav-dropdown'>
              <MenuItem eventKey='11.1'>
                <div onClick={logoutUser}>Odjava</div>
              </MenuItem>          
            </NavDropdown> 
          </Nav>
        }
      </Navbar>
    );
  } 
};

const mapDispatchToProps = {
  logoutUser: userActions.logoutUser,
};

export default connect(null, mapDispatchToProps)(NavigationBar);
