import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit } from 'redux-form';
import { EDIT_USER_PASSWORD_FORM } from '../../../../redux/forms';
import UserPasswordForm from './UserPasswordForm';

class EditUserPasswordModal extends Component {
  handleCloseModal = async () => {
    const { dispatch, handleClose } = this.props;

    handleClose();
    await dispatch(stopSubmit(EDIT_USER_PASSWORD_FORM, {}));
  }

  render() {
    const { show, handleSubmit, error } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal} centered='true' dialogClassName='app-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Promjena lozinke</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserPasswordForm
            onSubmit={handleSubmit}
            error={error}
            buttons={
              <Modal.Footer>
                <Button bsStyle='default' onClick={this.handleCloseModal}>
                  Odustani
                </Button>
                <Button bsStyle='primary' type='submit'>
                  Spremi
                </Button>
              </Modal.Footer>
            }
          />
        </Modal.Body>
      </Modal>
    );
  }
}

export default connect()(reduxForm({
  form: EDIT_USER_PASSWORD_FORM,
  enableReinitialize: true,
})(EditUserPasswordModal));
