import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { APP } from '../../constants/routes';

const NavigationBar = props => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <a href={APP.ROOT}>Preeclampsia Risk Estimator</a>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem eventKey={1} href={APP.PATIENTS}>
        Lista pacijenata
      </NavItem>
    </Nav>
  </Navbar>
);

export default NavigationBar;
