import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

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

    return (
      <Modal
        show={show}
        onHide={this.handleCloseModal}
        centered='true'
        dialogClassName='app-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Brisanje pacijenta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            patient &&
            <h4>
              Jeste li sigurni da želite obrisati pacijenta <b>
                {patient.firstName} {patient.lastName}
              </b> (MBO: <b>{patient.MBO}</b>)?
            </h4>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='default' onClick={this.handleCloseModal}>
            Odustani
          </Button>
          <Button bsStyle='danger' onClick={this.handleDeletePatient}>
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeletePatientModal;
