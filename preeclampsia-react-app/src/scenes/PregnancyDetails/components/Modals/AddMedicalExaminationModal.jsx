import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit, reset } from 'redux-form';
import { ADD_FIRST_TRIMESTER_BASIC_INFO_FORM } from 'redux/forms';
import { getTranslations } from 'utils/translation.utils';
import FirstTrimesterBasicInfoForm from '../FirstTrimesterDetails/components/BasicInfo/FirstTrimesterBasicInfoForm';

class AddMedicalExaminationModal extends Component {
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
		const { show, handleSubmit, error, change } = this.props;

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
					<Modal.Title>{translations.medicalExamination.modal.addMedicalExaminationTitle}</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FirstTrimesterBasicInfoForm
						onSubmit={handleSubmit}
						error={error}
						change={change}
						buttons={
							<div>
								<Button
									bsStyle='primary'
									type='submit'
								>
									{translations.pregnancy.action.save}
								</Button>
								<Button
									bsStyle='default'
									onClick={this.handleCloseModal}
								>
									{translations.action.cancel}
								</Button>
							</div>
						}
					/>
				</Modal.Body>
			</Modal>
		);
	}
}

const mapDispatchToProps = {
	stopSubmitForm: stopSubmit.bind(null, ADD_FIRST_TRIMESTER_BASIC_INFO_FORM, {}),
	resetForm: reset.bind(null, ADD_FIRST_TRIMESTER_BASIC_INFO_FORM),
};

export default connect(null, mapDispatchToProps)(reduxForm({
	form: ADD_FIRST_TRIMESTER_BASIC_INFO_FORM,
	enableReinitialize: false,
})(AddMedicalExaminationModal));
