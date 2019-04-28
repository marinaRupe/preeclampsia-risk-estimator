import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit } from 'redux-form';
import { ADD_PATIENT_FORM } from '../../../redux/forms';
import PatientForm from './PatientForm';

class AddPatientModal extends Component {
  handleCloseModal = async () => {
    const { dispatch, handleClose } = this.props;

    handleClose();
    await dispatch(stopSubmit(ADD_PATIENT_FORM, {}));
  }

  render() {
    const { show, handleSubmit, error } = this.props;

    return (
      <Modal show={show} onHide={this.handleCloseModal} centered='true' dialogClassName='app-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Dodavanje pacijenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PatientForm
            onSubmit={handleSubmit}
            error={error}
            buttons={
              <Modal.Footer>
                <Button bsStyle='default' onClick={this.handleCloseModal}>
                  Odustani
                </Button>
                <Button bsStyle='primary' type='submit'>
                  Spremi promjene
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
  form: ADD_PATIENT_FORM,
})(AddPatientModal));
