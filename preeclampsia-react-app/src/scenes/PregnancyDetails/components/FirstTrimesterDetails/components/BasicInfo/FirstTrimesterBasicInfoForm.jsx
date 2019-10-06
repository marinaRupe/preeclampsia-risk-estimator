import React, { Component } from 'react';
import { Field } from 'redux-form';
import Input from 'components/Inputs/Input';
import DateInput from 'components/Inputs/DateInput';
import { getTranslations } from 'utils/translation.utils';
import {
	calculateGestationalAgeFromCRL,
	calculateGestationalAgeFromDate,
	calculateGestationalAgeFromLastPeriodDate,
} from 'utils/pregnancy.utils';
import NumericalMeasurementInput from 'components/Measurement/Inputs/NumericalMeasurementInput';

class FirstTrimesterBasicInfoForm extends Component {
	constructor(props) {
		super(props);

		props.change('trimesterNumber', 1);
	}

	onChangeCRL = (newValue) => {
		const { change, ultrasoundDate, bloodTestDate, lastPeriodDate } = this.props;
		const CRL = newValue && newValue.value;
		let gestationalAgeByUltrasoundWeeks, gestationalAgeByUltrasoundDays;

		if (newValue && newValue.value) {
			const { weeks, days } = calculateGestationalAgeFromCRL(CRL);
			gestationalAgeByUltrasoundWeeks = weeks;
			gestationalAgeByUltrasoundDays = days;

			change('gestationalAgeByUltrasoundWeeks', +weeks);
			change('gestationalAgeByUltrasoundDays', +days);
		} else if (lastPeriodDate) {
			const { weeks, days } = calculateGestationalAgeFromLastPeriodDate(ultrasoundDate, lastPeriodDate);
			gestationalAgeByUltrasoundWeeks = weeks;
			gestationalAgeByUltrasoundDays = days;

			change('gestationalAgeByUltrasoundWeeks', +weeks);
			change('gestationalAgeByUltrasoundDays', +days);
		}

		if (!ultrasoundDate || !bloodTestDate || !gestationalAgeByUltrasoundWeeks) {
			return;
		}

		const gestationalAgeOnBloodTest = calculateGestationalAgeFromDate(
			ultrasoundDate,
			bloodTestDate,
			gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays
		);

		change('gestationalAgeOnBloodTestWeeks', +gestationalAgeOnBloodTest.weeks);
		change('gestationalAgeOnBloodTestDays', +gestationalAgeOnBloodTest.days);
	}

	onChangeUltrasoundDate = (e) => {
		const {
			change,
			CRL,
			lastPeriodDate,
			bloodTestDate,
			gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays,
		} = this.props;
		const ultrasoundDate = e.target.value;

		if (!(CRL && CRL.value)) {
			const { weeks, days } = calculateGestationalAgeFromLastPeriodDate(ultrasoundDate, lastPeriodDate);
			change('gestationalAgeByUltrasoundWeeks', +weeks);
			change('gestationalAgeByUltrasoundDays', +days);
		}

		if (!ultrasoundDate || !bloodTestDate || !gestationalAgeByUltrasoundWeeks) {
			return;
		}

		const { weeks, days } = calculateGestationalAgeFromDate(
			ultrasoundDate,
			bloodTestDate,
			gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays
		);

		change('gestationalAgeOnBloodTestWeeks', +weeks);
		change('gestationalAgeOnBloodTestDays', +days);
	}

	onChangeBloodTestDate = (e) => {
		const {
			change,
			ultrasoundDate,
			gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays,
		} = this.props;
		const bloodTestDate = e.target.value;

		if (!ultrasoundDate || !bloodTestDate || !gestationalAgeByUltrasoundWeeks) {
			return;
		}

		const { weeks, days } = calculateGestationalAgeFromDate(
			ultrasoundDate,
			bloodTestDate,
			gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays
		);

		change('gestationalAgeOnBloodTestWeeks', +weeks);
		change('gestationalAgeOnBloodTestDays', +days);
	}

	render() {
		const {
			onSubmit,
			error,
			initialValues,
			disabled = {},
			change,
			buttons,
		} = this.props;

		const FetalCrownRumpLength = initialValues ? initialValues.FetalCrownRumpLength : null;
		const translations = getTranslations();

		const today = new Date();

		return (
			<form className='redux-form' onSubmit={onSubmit}>
				<div>
					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.trimesterNumber}
								<span className='required'>*</span>
							</label>
							<Field
								name='trimesterNumber'
								placeholder={''}
								component={Input}
								type='number'
								disabled={true}
							/>
						</div>
					</div>
					<div className='redux-form__row'>
						<div className='w-100'>
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
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.ultrasoundDate}
							</label>
							<Field
								name='ultrasoundDate'
								placeholder={''}
								component={DateInput}
								maxDate={today}
								disabled={disabled.ultrasoundDate}
								onChange={this.onChangeUltrasoundDate}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.gynecologist}
							</label>
							<Field
								name='gynecologist'
								placeholder={''}
								component={Input}
								type='text'
								disabled={disabled.gynecologist}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.ultrasoundDataMeasuredBy}
							</label>
							<Field
								name='ultrasoundDataMeasuredBy'
								placeholder={''}
								component={Input}
								type='text'
								disabled={disabled.ultrasoundDataMeasuredBy}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.gestationalAgeByUltrasound}
							</label>
							<div className='redux-form__row'>
								<div className='w-30 align-vertical--baseline'>
									<div className='redux-form__input--gestational-age'>
										<Field
											name='gestationalAgeByUltrasoundWeeks'
											placeholder={''}
											component={Input}
											type='number'
											disabled={true}
										/>
									</div>
									<span className='ml-5'>{translations.medicalExamination.property.weeks}</span>
								</div>

								<div className='w-70 ml-10 align-vertical--baseline'>
									<div className='redux-form__input--gestational-age'>
										<Field
											name='gestationalAgeByUltrasoundDays'
											placeholder={''}
											component={Input}
											type='number'
											disabled={true}
										/>
									</div>
									<span className='ml-5'>{translations.medicalExamination.property.days}</span>
								</div>
							</div>
						</div>
					</div>

					<NumericalMeasurementInput
						characteristicName='FetalCrownRumpLength'
						disabled={disabled.FetalCrownRumpLength}
						measurement={FetalCrownRumpLength}
						change={change}
						onChange={this.onChangeCRL}
					/>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.bloodTestDate}
								<span className='required'>*</span>
							</label>
							<Field
								name='bloodTestDate'
								placeholder={''}
								component={DateInput}
								maxDate={today}
								disabled={disabled.bloodTestDate}
								onChange={this.onChangeBloodTestDate}
							/>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.gestationalAgeOnBloodTest}
								<span className='required'>*</span>
							</label>
							<div className='redux-form__row'>
								<div className='w-30 align-vertical--baseline'>
									<div className='redux-form__input--gestational-age'>
										<Field
											name='gestationalAgeOnBloodTestWeeks'
											placeholder={''}
											component={Input}
											type='number'
											disabled={true}
										/>
									</div>
									<span className='ml-5'>{translations.medicalExamination.property.weeks}</span>
								</div>

								<div className='w-70 ml-10 align-vertical--baseline'>
									<div className='redux-form__input--gestational-age'>
										<Field
											name='gestationalAgeOnBloodTestDays'
											placeholder={''}
											component={Input}
											type='number'
											disabled={true}
										/>
									</div>
									<span className='ml-5'>{translations.medicalExamination.property.days}</span>
								</div>
							</div>
						</div>
					</div>

					<div className='redux-form__row'>
						<div className='w-100'>
							<label className='redux-form__label'>
								{translations.medicalExamination.property.note}
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
