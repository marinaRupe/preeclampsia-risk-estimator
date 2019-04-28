import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit } from 'redux-form';
import { ADD_USER_FORM } from '../../../redux/forms';
import UserForm from './UserForm';

class AddUserModal extends Component {
  handleCloseModal = async () => {
    const { dispatch, handleClose } = this.props;

    handleClose();
    await dispatch(stopSubmit(ADD_USER_FORM, {}));
  }

  render() {
    const { show, handleSubmit, error } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal} centered='true' dialogClassName='app-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Dodavanje korisika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserForm
            onSubmit={handleSubmit}
            error={error}
            buttons={
              <Modal.Footer>
                <Button bsStyle='default' onClick={this.handleCloseModal}>
                  Odustani
                </Button>
                <Button bsStyle='primary' type='submit'>
                  Dodaj korisnika
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
  form: ADD_USER_FORM,
})(AddUserModal));
