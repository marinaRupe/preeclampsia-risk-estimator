import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit } from 'redux-form';
import { EDIT_USER_FORM } from '../../../redux/forms';
import UserForm from './UserForm';

class EditUserModal extends Component {
  handleCloseModal = async () => {
    const { dispatch, handleClose } = this.props;

    handleClose();
    await dispatch(stopSubmit(EDIT_USER_FORM, {}));
  }

  render() {
    const { show, handleSubmit, error, initialValues } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal} centered='true' dialogClassName='app-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Uređivanje korisika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            onSubmit={handleSubmit}
            initialValues={initialValues}
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
  form: EDIT_USER_FORM,
  enableReinitialize: true,
})(EditUserModal));
