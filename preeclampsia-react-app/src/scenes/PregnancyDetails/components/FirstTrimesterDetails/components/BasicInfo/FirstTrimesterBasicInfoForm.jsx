import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from 'components/Inputs/Input';
import { getTranslations } from 'utils/translation.utils';

class FirstTrimesterBasicInfoForm extends Component {
	render() {
		const {
			onSubmit,
			error,
			disabled = {},
			buttons,
		} = this.props;

		const translations = getTranslations();

		return (
			<form className='redux-form' onSubmit={onSubmit}>
				<div>
					<div className='redux-form__row'>
						<div className='w-50'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.protocol}
								<span className='required'>*</span>
							</label>
							<Field
								name='protocol'
								placeholder={''}
								component={Input}
								type='number'
								disabled={disabled.protocol}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-50'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.bloodTestDate}
								<span className='required'>*</span>
							</label>
							<Field
								name='bloodTestDate'
								placeholder={''}
								component={Input}
								type='date'
								disabled={disabled.bloodTestDate}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-50'>
							<label className='redux-form__label'>
								{translations.patient.property.ultrasoundDate}
								<span className='required'>*</span>
							</label>
							<Field
								name='ultrasoundDate'
								placeholder={''}
								component={Input}
								type='date'
								disabled={disabled.ultrasoundDate}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-50'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.note}
								<span className='required'>*</span>
							</label>
							<Field
								name='note'
								placeholder={''}
								component={Input}
								type='text'
								disabled={disabled.note}
							/>
						</div>
					</div>

				</div>
				{error && <div className='redux-form__error'>{error}</div>}      
				{buttons}
			</form>
		);
	}
}

export default FirstTrimesterBasicInfoForm;
