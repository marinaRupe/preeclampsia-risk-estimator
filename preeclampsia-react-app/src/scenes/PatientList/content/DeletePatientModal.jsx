import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getTranslations } from 'utils/translation.utils';

class DeletePatientModal extends Component {
  handleDeletePatient = () => {
    const { patient, deletePatient } = this.props;
    deletePatient(patient.id);
  }

  handleCloseModal = async () => {
    const { handleClose } = this.props;
    handleClose();
  }

  render() {
    const { show, patient } = this.props;

    const translations = getTranslations();

    return (
      <Modal
        show={show}
        onHide={this.handleCloseModal}
        centered='true'
        dialogClassName='app-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>{translations.patient.modal.deletePatientTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            patient &&
            <h4>
              {translations.patient.modal.deleteUserText} <b>
                {patient.firstName} {patient.lastName}
              </b> ({translations.patient.property.MBO}: <b>{patient.MBO}</b>)?
            </h4>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='default' onClick={this.handleCloseModal}>
            {translations.action.cancel}
          </Button>
          <Button bsStyle='danger' onClick={this.handleDeletePatient}>
            {translations.action.delete}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeletePatientModal;
