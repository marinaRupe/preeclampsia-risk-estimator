import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit } from 'redux-form';
import { getTranslations } from 'utils/translation.utils';
import { EDIT_PREGNANCY_BASIC_INFO_FORM } from 'redux/forms';
import PregnancyBasicInfoForm from './PregnancyBasicInfoForm';

class EditPregnancyBasicInfoForm extends Component {
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
		} = this.props;

		const translations = getTranslations();

		return (
			<div className='w-50'>
				<PregnancyBasicInfoForm
					onSubmit={handleSubmit}
					initialValues={initialValues}
					error={error}
					change={change}
					disabled={{ pregnancyNumber: true }}
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

const mapDispatchToProps = {
	stopSubmitForm: stopSubmit.bind(null, EDIT_PREGNANCY_BASIC_INFO_FORM, {}),
};

export default connect(null, mapDispatchToProps)(reduxForm({
	form: EDIT_PREGNANCY_BASIC_INFO_FORM,
	enableReinitialize: true,
})(EditPregnancyBasicInfoForm));
