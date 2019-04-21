import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { APP } from '../../constants/routes';

const NavigationBar = props => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href={APP.ROOT} className='nav-logo'>
          <i className='material-icons'>local_hospital</i>
          <span>Preeclampsia Risk Estimator</span>
        </a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href={APP.PATIENTS}>
        Lista pacijenata
      </NavItem>
      <NavItem eventKey={2} href={APP.STATISTICS}>
        Statistika
      </NavItem>
      <NavItem eventKey={3} href={APP.USERS}>
        Lista korisnika
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavigationBar;
