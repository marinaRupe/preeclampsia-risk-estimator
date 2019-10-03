import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit, formValueSelector } from 'redux-form';
import { getTranslations } from 'utils/translation.utils';
import { EDIT_FIRST_TRIMESTER_BASIC_INFO_FORM } from 'redux/forms';
import FirstTrimesterBasicInfoForm from './FirstTrimesterBasicInfoForm';

class EditFirstTrimesterBasicInfoForm extends Component {
	handleClose = async () => {
		const { closeEditMode, stopSubmitForm } = this.props;
		closeEditMode();
		await stopSubmitForm();
	}

	render() {
		const {
			handleSubmit,
			error,
			initialValues,
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
			<div className='w-50'>
				<FirstTrimesterBasicInfoForm
					onSubmit={handleSubmit}
					initialValues={initialValues}
					gestationalAgeByUltrasoundWeeks={gestationalAgeByUltrasoundWeeks}
					gestationalAgeByUltrasoundDays={gestationalAgeByUltrasoundDays}
					ultrasoundDate={ultrasoundDate}
					bloodTestDate={bloodTestDate}
					lastPeriodDate={lastPeriodDate}
					CRL={CRL}
					error={error}
					change={change}
					disabled={{ trimesterNumber: true }}
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
								onClick={this.handleClose}
							>
								{translations.action.cancel}
							</Button>
						</div>
					}
				/>
			</div>
		);
	}
}

const selector = formValueSelector(EDIT_FIRST_TRIMESTER_BASIC_INFO_FORM);
const mapStateToProps = state => ({
	gestationalAgeByUltrasoundWeeks: selector(state, 'gestationalAgeByUltrasoundWeeks'),
	gestationalAgeByUltrasoundDays: selector(state, 'gestationalAgeByUltrasoundDays'),
	ultrasoundDate: selector(state, 'ultrasoundDate'),
	bloodTestDate: selector(state, 'bloodTestDate'),
	CRL: selector(state, 'FetalCrownRumpLength'),
	lastPeriodDate: state.pregnancy.details.lastPeriodDate,
});

const mapDispatchToProps = {
	stopSubmitForm: stopSubmit.bind(null, EDIT_FIRST_TRIMESTER_BASIC_INFO_FORM, {}),
};

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
	form: EDIT_FIRST_TRIMESTER_BASIC_INFO_FORM,
	enableReinitialize: true,
})(EditFirstTrimesterBasicInfoForm));
