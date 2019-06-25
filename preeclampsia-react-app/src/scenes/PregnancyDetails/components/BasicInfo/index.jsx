import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { getTranslations } from 'utils/translation.utils';
import DateDisplay from 'components/Measurement/DateDisplay';
import BooleanMeasurement from 'components/Measurement/BooleanMeasurement';
import EnumMeasurement from 'components/Measurement/EnumMeasurement';
import NumericalMeasurement from 'components/Measurement/NumericalMeasurement';
import EditPregnancyBasicInfoForm from './EditPregnancyBasicInfoForm';

class BasicInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditModeOn: false,
		};
	}
	
	getInitialValues = () => {
		const {
			pregnancy: {
				id,
				pregnancyNumber,
				lastPeriodDate,
				lastPeriodDateIsReliable,
				deliveryDate,
				pregnancyType,
				conceptionMethod,
				numberOfPreviousBirths,
				numberOfPreviousPregnancies,
				hadPEInPreviousPregnancy,
				motherOfPatientHadPE,
				resultedWithPE,
			} } = this.props;

		return {
			id,
			pregnancyNumber,
			lastPeriodDate,
			lastPeriodDateIsReliable,
			deliveryDate,
			pregnancyType,
			conceptionMethod,
			numberOfPreviousBirths,
			numberOfPreviousPregnancies,
			hadPEInPreviousPregnancy,
			motherOfPatientHadPE,
			resultedWithPE,
		};
	}

	openEditMode = () => {
		this.setState({ isEditModeOn: true });
	}

	closeEditMode = () => {
		this.setState({ isEditModeOn: false });
	}

	saveChanges = async (pregnancyData) => {
		const { pregnancy: { patientId }, editPregnancy } = this.props;
		await editPregnancy(patientId, pregnancyData);
		this.closeEditMode();
	};

	render() {
		const { isEditModeOn } = this.state;
		const {
			pregnancy: {
				pregnancyNumber,
				lastPeriodDate,
				lastPeriodDateIsReliable,
				deliveryDate,
				pregnancyType,
				conceptionMethod,
				numberOfPreviousBirths,
				numberOfPreviousPregnancies,
				hadPEInPreviousPregnancy,
				motherOfPatientHadPE,
				resultedWithPE
			} } = this.props;

		const translations = getTranslations();

		return (
			<div className='pregnancy__card'>
				<Grid>
					<Row>
						<h4 className='pregnancy__card--title'>
							<span>{translations.pregnancy.basicDetailsTitle}</span>
							{
								!isEditModeOn &&
								<i onClick={this.openEditMode} className='material-icons'>edit</i>
							}
						</h4>
					</Row>

					{
						!isEditModeOn
							?
							<div>
								<NumericalMeasurement
									label={translations.pregnancy.property.pregnancyNumber}
									value={pregnancyNumber}
								/>

								<EnumMeasurement
									characteristicName='PregnancyType'
									value={pregnancyType}
								/>

								<EnumMeasurement
									characteristicName='ConceptionMethod'
									value={conceptionMethod}
								/>

								<NumericalMeasurement
									label={translations.pregnancy.property.numberOfPreviousPregnancies}
									value={numberOfPreviousPregnancies}
								/>

								<NumericalMeasurement
									label={translations.pregnancy.property.numberOfPreviousBirths}
									value={numberOfPreviousBirths}
								/>

								<DateDisplay
									label={translations.pregnancy.property.lastPeriodDate}
									value={lastPeriodDate}
								/>

								<BooleanMeasurement
									label={translations.pregnancy.property.lastPeriodDateIsReliable}
									value={lastPeriodDateIsReliable}
								/>

								<DateDisplay
									label={translations.pregnancy.property.deliveryDate}
									value={deliveryDate}
								/>

								<BooleanMeasurement
									label={translations.pregnancy.property.hadPEInPreviousPregnancy}
									value={hadPEInPreviousPregnancy}
								/>

								<BooleanMeasurement
									characteristicName='MotherOfPatientHadPE'
									value={motherOfPatientHadPE}
								/>

								<BooleanMeasurement
									label={translations.pregnancy.property.resultedWithPE}
									value={resultedWithPE}
								/>
							</div>
							
							:
							<EditPregnancyBasicInfoForm
								onSubmit={this.saveChanges}
								initialValues={this.getInitialValues()}
								closeEditMode={this.closeEditMode}
							/>
					}
				</Grid>
			</div>
		);
	}
}

export default BasicInfo;
