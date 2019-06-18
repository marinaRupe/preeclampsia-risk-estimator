import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getTranslations } from 'utils/translation.utils';

class DeletePregnancyModal extends Component {
	handleCloseModal = async () => {
		const { handleClose } = this.props;
		handleClose();
	}

	render() {
		const { show, deletePregnancy } = this.props;

		const translations = getTranslations();

		return (
			<Modal
				show={show}
				onHide={this.handleCloseModal}
				centered='true'
				backdrop='static'
				dialogClassName='app-modal'
			>
				<Modal.Header closeButton>
					<Modal.Title>{translations.pregnancy.modal.deletePregnancyTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<h4>
						{translations.pregnancy.modal.deletePregnancyText}?
					</h4>
				</Modal.Body>
				<Modal.Footer>
					<Button bsStyle='default' onClick={this.handleCloseModal}>
						{translations.action.cancel}
					</Button>
					<Button bsStyle='danger' onClick={deletePregnancy}>
						{translations.action.delete}
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DeletePregnancyModal;
