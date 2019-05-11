import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { userRoles } from '../../../constants/roles.constants';
import { getTranslations } from '../../../utils/translation.utils';

class UserSidebar extends Component {
  render() {
    const { user, closeSidebar, openEditUserModal, openDeleteUserModal } = this.props;

    const userRolesValues = Object.values(userRoles);
    const translations = getTranslations();

    return (
      <div className='table-view--details'>
        <div>
          <div className='table-view--details__header'>
            <h4>{translations.user.detailsTitle}</h4>
            <i className='material-icons' onClick={closeSidebar}>close</i>
          </div>
          <div>
            <div className='info-group'>
              <label>{translations.user.property.firstName}: </label>
              <div>{user.firstName || '-'}</div>
            </div>
            <div className='info-group'>
              <label>{translations.user.property.lastName}: </label>
              <div>{user.lastName || '-'}</div>
            </div>
            <div className='info-group'>
              <label>{translations.user.property.role}: </label>
              <div>{user.role ? userRolesValues.find(u => u.value === user.role).hr : ''}</div>
            </div>
            <div className='info-group'>
              <label>{translations.user.property.email}: </label>
              <div>{user.email || '-'}</div>
            </div>
          </div>
        </div>
        
        <div className='table-view--details__footer'>
          <Button
            bsStyle='primary'
            onClick={openEditUserModal}
          >
            {translations.user.action.edit}
          </Button>
          <Button
            bsStyle='danger'
            onClick={openDeleteUserModal}
          >
            {translations.user.action.delete}
          </Button>
        </div>
      </div>
    );
  }
}

export default UserSidebar;
