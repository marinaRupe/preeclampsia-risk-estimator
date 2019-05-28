import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { userRoles } from '../../../constants/roles.constants';
import { getTranslations } from '../../../utils/translation.utils';
import TextInfoDisplay from '../../../components/Measurement/TextInfoDisplay';

class UserSidebar extends Component {
  render() {
    const { user, closeSidebar, openEditUserModal, openDeleteUserModal } = this.props;

    const userRolesValues = Object.values(userRoles);
    const translations = getTranslations();

    const labelColumnSize = 3;
    const valueColumnSize = 8;

    return (
      <div className='table-view--details'>
        <div>
          <div className='table-view--details__header'>
            <h4>{translations.user.detailsTitle}</h4>
            <i className='material-icons' onClick={closeSidebar}>close</i>
          </div>

          <div>
            <TextInfoDisplay
              label={translations.user.property.firstName}
              value={user.firstName}
              labelColumnSize={labelColumnSize}
              valueColumnSize={valueColumnSize}
            />

            <TextInfoDisplay
              label={translations.patient.property.lastName}
              value={user.lastName}
              labelColumnSize={labelColumnSize}
              valueColumnSize={valueColumnSize}
            />

            <TextInfoDisplay
              label={translations.user.property.role}
              value={user.role && userRolesValues.find(u => u.value === user.role).hr}
              labelColumnSize={labelColumnSize}
              valueColumnSize={valueColumnSize}
            />

            <TextInfoDisplay
              label={translations.user.property.email}
              value={user.email}
              labelColumnSize={labelColumnSize}
              valueColumnSize={valueColumnSize}
            />
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
