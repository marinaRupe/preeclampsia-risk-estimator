import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';

class DeleteUserModal extends Component {
  handleDeleteUser = () => {
    const { user, deleteUser } = this.props;
    deleteUser(user.id);
  }

  handleCloseModal = async () => {
    const { handleClose } = this.props;
    handleClose();
  }

  render() {
    const { show, user } = this.props;

    return (
      <Modal
        show={show}
        onHide={this.handleCloseModal}
        centered='true'
        dialogClassName='app-modal'
      >
        <Modal.Header closeButton>
          <Modal.Title>Brisanje korisika</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {
            user &&
            <h4>
              Jeste li sigurni da želite obrisati korisnika <b>{user.firstName} {user.lastName} ({user.email})</b>?
            </h4>
          }
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='default' onClick={this.handleCloseModal}>
            Odustani
          </Button>
          <Button bsStyle='danger' onClick={this.handleDeleteUser}>
            Obriši
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteUserModal;
