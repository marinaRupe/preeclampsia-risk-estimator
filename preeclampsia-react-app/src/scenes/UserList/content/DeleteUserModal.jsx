import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getTranslations } from 'utils/translation.utils';

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

  	const translations = getTranslations();

  	return (
  		<Modal
  			show={show}
  			onHide={this.handleCloseModal}
  			centered='true'
  			dialogClassName='app-modal'
  		>
  			<Modal.Header closeButton>
  				<Modal.Title>{translations.user.modal.deleteUserTitle}</Modal.Title>
  			</Modal.Header>
  			<Modal.Body>
  				{
  					user &&
            <h4>
            	{translations.user.modal.deleteUserText} <b>{user.firstName} {user.lastName} ({user.email})</b>?
            </h4>
  				}
  			</Modal.Body>
  			<Modal.Footer>
  				<Button bsStyle='default' onClick={this.handleCloseModal}>
  					{translations.action.cancel}
  				</Button>
  				<Button bsStyle='danger' onClick={this.handleDeleteUser}>
  					{translations.user.action.delete}
  				</Button>
  			</Modal.Footer>
  		</Modal>
  	);
  }
}

export default DeleteUserModal;
