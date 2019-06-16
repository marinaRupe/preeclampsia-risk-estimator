import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit } from 'redux-form';
import { EDIT_USER_PASSWORD_FORM } from 'redux/forms';
import { getTranslations } from 'utils/translation.utils';
import UserPasswordForm from './UserPasswordForm';

class EditUserPasswordModal extends Component {
	handleCloseModal = async () => {
		const { dispatch, handleClose } = this.props;

		handleClose();
		await dispatch(stopSubmit(EDIT_USER_PASSWORD_FORM, {}));
	}

	render() {
		const { show, handleSubmit, error } = this.props;

		const translations = getTranslations();

		return (
			<Modal show={show} onHide={this.handleCloseModal} centered='true' dialogClassName='app-modal'>
				<Modal.Header closeButton>
					<Modal.Title>{translations.user.modal.editPasswordTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UserPasswordForm
						onSubmit={handleSubmit}
						error={error}
						buttons={
							<Modal.Footer>
								<Button bsStyle='default' onClick={this.handleCloseModal}>
									{translations.action.cancel}
								</Button>
								<Button bsStyle='primary' type='submit'>
									{translations.action.save}
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
	form: EDIT_USER_PASSWORD_FORM,
	enableReinitialize: true,
})(EditUserPasswordModal));
