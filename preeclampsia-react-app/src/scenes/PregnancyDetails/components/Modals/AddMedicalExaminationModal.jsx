import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Button } from 'react-bootstrap';
import { reduxForm, stopSubmit, reset, formValueSelector } from 'redux-form';
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
		const {
			show,
			handleSubmit,
			error,
			change,
			gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays,
			ultrasoundDate,
			bloodTestDate,
			lastPeriodDate,
			CRL,
		} = this.props;

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
						gestationalAgeByUltrasoundWeeks={gestationalAgeByUltrasoundWeeks}
						gestationalAgeByUltrasoundDays={gestationalAgeByUltrasoundDays}
						ultrasoundDate={ultrasoundDate}
						bloodTestDate={bloodTestDate}
						lastPeriodDate={lastPeriodDate}
						CRL={CRL}
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

const selector = formValueSelector(ADD_FIRST_TRIMESTER_BASIC_INFO_FORM);
const mapStateToProps = state => ({
	gestationalAgeByUltrasoundWeeks: selector(state, 'gestationalAgeByUltrasoundWeeks'),
	gestationalAgeByUltrasoundDays: selector(state, 'gestationalAgeByUltrasoundDays'),
	ultrasoundDate: selector(state, 'ultrasoundDate'),
	bloodTestDate: selector(state, 'bloodTestDate'),
	CRL: selector(state, 'FetalCrownRumpLength'),
	lastPeriodDate: state.pregnancy.details.lastPeriodDate,
});

const mapDispatchToProps = {
	stopSubmitForm: stopSubmit.bind(null, ADD_FIRST_TRIMESTER_BASIC_INFO_FORM, {}),
	resetForm: reset.bind(null, ADD_FIRST_TRIMESTER_BASIC_INFO_FORM),
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: ADD_FIRST_TRIMESTER_BASIC_INFO_FORM,
	enableReinitialize: false,
})(AddMedicalExaminationModal));
