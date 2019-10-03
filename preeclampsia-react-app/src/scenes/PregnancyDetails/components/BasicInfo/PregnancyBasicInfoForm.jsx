import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from 'components/Inputs/Input';
import Select from 'components/Inputs/Select';
import DateInput from 'components/Inputs/DateInput';
import { getTranslations, getCharacteristicTranslation } from 'utils/translation.utils';
import {
	getCharacteristicByName,
	getBooleanMeasurementOptions,
	getEnumMeasurementOptions
} from 'utils/measurement.utils';

class PregnancyBasicInfoForm extends Component {
	render() {
		const {
			onSubmit,
			error,
			disabled = {},
			buttons,
		} = this.props;

		const translations = getTranslations();
	
		const booleanMeasurementOptions = getBooleanMeasurementOptions();
		const pregnancyTypesOptions = getEnumMeasurementOptions(getCharacteristicByName('PregnancyType').key);
		const conceptionMethodsOptions = getEnumMeasurementOptions(getCharacteristicByName('ConceptionMethod').key);
		
		const today = new Date();

		return (
			<form className='redux-form' onSubmit={onSubmit}>
				<div>
					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.pregnancy.property.pregnancyNumber}
								<span className='required'>*</span>
							</label>
							<Field
								name='pregnancyNumber'
								placeholder={''}
								component={Input}
								type='number'
								disabled={disabled.pregnancyNumber}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{getCharacteristicTranslation(getCharacteristicByName('PregnancyType'))}
								<span className='required'>*</span>
							</label>
							<Field
								name='pregnancyType'
								placeholder={''}
								component={Select}
								children={pregnancyTypesOptions}
								disabled={disabled.pregnancyType}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{getCharacteristicTranslation(getCharacteristicByName('ConceptionMethod'))}
								<span className='required'>*</span>
							</label>
							<Field
								name='conceptionMethod'
								component={Select}
								children={conceptionMethodsOptions}
								disabled={disabled.conceptionMethod}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.pregnancy.property.numberOfPreviousPregnancies}
							</label>
							<Field
								name='numberOfPreviousPregnancies'
								placeholder={''}
								component={Input}
								type='number'
								disabled={disabled.numberOfPreviousPregnancies}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.pregnancy.property.numberOfPreviousBirths}
							</label>
							<Field
								name='numberOfPreviousBirths'
								placeholder={''}
								component={Input}
								type='number'
								disabled={disabled.numberOfPreviousBirths}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.pregnancy.property.lastPeriodDate}
							</label>
							<Field
								name='lastPeriodDate'
								placeholder={''}
								component={DateInput}
								maxDate={today}
								disabled={disabled.lastPeriodDate}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.pregnancy.property.lastPeriodDateIsReliable}
							</label>
							<Field
								name='lastPeriodDateIsReliable'
								component={Select}
								children={booleanMeasurementOptions}
								disabled={disabled.lastPeriodDateIsReliable}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.pregnancy.property.deliveryDate}
							</label>
							<Field
								name='deliveryDate'
								placeholder={''}
								component={DateInput}
								maxDate={today}
								disabled={disabled.deliveryDate}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.pregnancy.property.hadPEInPreviousPregnancy}
							</label>
							<Field
								name='hadPEInPreviousPregnancy'
								component={Select}
								children={booleanMeasurementOptions}
								disabled={disabled.hadPEInPreviousPregnancy}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{getCharacteristicTranslation(getCharacteristicByName('MotherOfPatientHadPE'))}
							</label>
							<Field
								name='motherOfPatientHadPE'
								component={Select}
								children={booleanMeasurementOptions}
								disabled={disabled.motherOfPatientHadPE}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.pregnancy.property.resultedWithPE}
							</label>
							<Field
								name='resultedWithPE'
								component={Select}
								children={booleanMeasurementOptions}
								disabled={disabled.resultedWithPE}
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

export default PregnancyBasicInfoForm;
