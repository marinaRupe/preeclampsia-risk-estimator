import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { userRoles } from '../../../constants/roles.constants';

class UserSidebar extends Component {
  render() {
    const { user, closeSidebar, openEditUserModal, openDeleteUserModal } = this.props;

    const userRolesValues = Object.values(userRoles);

    return (
      <div className='table-view--details'>
        <div>
          <div className='table-view--details__header'>
            <h4>Detalji o korisniku</h4>
            <i className='material-icons' onClick={closeSidebar}>close</i>
          </div>
          <div>
            <div className='info-group'>
              <label>Ime: </label>
              <div>{user.firstName || '-'}</div>
            </div>
            <div className='info-group'>
              <label>Prezime: </label>
              <div>{user.lastName || '-'}</div>
            </div>
            <div className='info-group'>
              <label>Uloga: </label>
              <div>{user.role ? userRolesValues.find(u => u.value === user.role).hr : ''}</div>
            </div>
            <div className='info-group'>
              <label>E-mail: </label>
              <div>{user.email || '-'}</div>
            </div>
          </div>
        </div>
        
        <div className='table-view--details__footer'>
          <Button
            bsStyle='primary'
            onClick={openEditUserModal}
          >
            Uredi podatke
          </Button>
          <Button
            bsStyle='danger'
            onClick={openDeleteUserModal}
          >
            Izbriši korisnika
          </Button>
        </div>
      </div>
    );
  }
}

export default UserSidebar;
