import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit } from 'redux-form';
import { EDIT_PATIENT_FORM } from '../../../redux/forms';
import PatientForm from './PatientForm';

class EditPatientModal extends Component {
  handleCloseModal = async () => {
    const { dispatch, handleClose } = this.props;

    handleClose();
    await dispatch(stopSubmit(EDIT_PATIENT_FORM, {}));
  }

  render() {
    const { show, handleSubmit, error, initialValues } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal} centered='true' dialogClassName='app-modal'>
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

export default connect()(reduxForm({
  form: EDIT_PATIENT_FORM,
  enableReinitialize: true,
})(EditPatientModal));
