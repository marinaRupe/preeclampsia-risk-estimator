import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit, reset } from 'redux-form';
import { ADD_USER_FORM } from 'redux/forms';
import { getTranslations } from 'utils/translation.utils';
import UserForm from './UserForm';

class AddUserModal extends Component {
  handleCloseModal = async () => {
    const { handleClose, stopSubmitForm } = this.props;
    handleClose();
    await stopSubmitForm();
  }

  handleAfterCloseModal = async () => {
    const { resetForm } = this.props;
    await resetForm();
  }

  render() {
    const { show, handleSubmit, error } = this.props;

    const translations = getTranslations();

    return (
      <Modal
        show={show}
        onHide={this.handleCloseModal}
        onExited={this.handleAfterCloseModal}
        centered='true'
        dialogClassName='app-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>{translations.user.modal.addUserTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            onSubmit={handleSubmit}
            error={error}
            buttons={
              <Modal.Footer>
                <Button bsStyle='default' onClick={this.handleCloseModal}>
                  {translations.action.cancel}
                </Button>
                <Button bsStyle='primary' type='submit'>
                  {translations.user.action.add}
                </Button>
              </Modal.Footer>
            }
          />
        </Modal.Body>
      </Modal>
    );
  }
}

const mapDispatchToProps = {
  stopSubmitForm: stopSubmit.bind(null, ADD_USER_FORM, {}),
  resetForm: reset.bind(null, ADD_USER_FORM),
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: ADD_USER_FORM,
  enableReinitialize: false,
})(AddUserModal));
