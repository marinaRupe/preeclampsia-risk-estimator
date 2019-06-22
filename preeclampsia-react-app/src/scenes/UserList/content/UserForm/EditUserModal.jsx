import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit, reset } from 'redux-form';
import { EDIT_USER_FORM } from 'redux/forms';
import { getTranslations } from 'utils/translation.utils';
import UserForm from './UserForm';

class EditUserModal extends Component {
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

		const translations = getTranslations();

		return (
			<Modal
				show={show}
				onHide={this.handleCloseModal}
				onExited={this.handleAfterCloseModal}
				centered='true'
				backdrop='static'
				dialogClassName='app-modal'
			>
				<Modal.Header closeButton>
					<Modal.Title>{translations.user.modal.editUserTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<UserForm
						onSubmit={handleSubmit}
						initialValues={initialValues}
						showPasswordInputs={false}
						error={error}
						disabled={{ email: true }}
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

const mapDispatchToProps = {
	stopSubmitForm: stopSubmit.bind(null, EDIT_USER_FORM, {}),
	resetForm: reset.bind(null, EDIT_USER_FORM),
};

export default connect(null, mapDispatchToProps)(reduxForm({
	form: EDIT_USER_FORM,
	enableReinitialize: true,
})(EditUserModal));
