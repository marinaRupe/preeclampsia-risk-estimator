import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit, reset } from 'redux-form';
import { EDIT_PATIENT_FORM } from '../../../redux/forms';
import PatientForm from './PatientForm';

class EditPatientModal extends Component {
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
    const { show, handleSubmit, error, initialValues } = this.props;

    return (
      <Modal
        show={show}
        onHide={this.handleCloseModal}
        onExited={this.handleAfterCloseModal}
        centered='true'
        dialogClassName='app-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Uređivanje pacijenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PatientForm
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

const mapDispatchToProps = {
  stopSubmitForm: stopSubmit.bind(null, EDIT_PATIENT_FORM, {}),
  resetForm: reset.bind(null, EDIT_PATIENT_FORM),
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: EDIT_PATIENT_FORM,
  enableReinitialize: true,
})(EditPatientModal));
