import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { getTranslations } from 'utils/translation.utils';
import DateDisplay from 'components/Measurement/DateDisplay';
import GestationalAgeDisplay from 'components/Measurement/GestationalAgeDisplay';
import NumericalMeasurement from 'components/Measurement/NumericalMeasurement';
import TextInfoDisplay from 'components/Measurement/TextInfoDisplay';
import EditFirstTrimesterBasicInfoForm from './EditFirstTrimesterBasicInfoForm';

class BasicInfo extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditModeOn: false,
		};
	}

	gestationalAge = (CRL) => {
		const gestationalAgeInDays = Math.pow((CRL * 1.037), 0.5) * 8.052 + 23.73;
		const weeks = Math.floor(gestationalAgeInDays / 7);
		const days = Math.floor(gestationalAgeInDays % 7);
		return <span>{weeks}<sup>+{days}</sup></span>;
	}
	
	getInitialValues = () => {
		const {
			medicalExaminationData: {
				id,
				trimesterNumber,
				gestationalAgeByUltrasoundWeeks,
				gestationalAgeByUltrasoundDays,
				gestationalAgeOnBloodTestWeeks,
				gestationalAgeOnBloodTestDays,
				ultrasoundDate,
				bloodTestDate,
				numericalMeasurements,
				protocol,
				note,
			} } = this.props;

		return {
			id,
			trimesterNumber,
			gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays,
			gestationalAgeOnBloodTestWeeks,
			gestationalAgeOnBloodTestDays,
			ultrasoundDate,
			bloodTestDate,
			protocol,
			note,
			FetalCrownRumpLength: numericalMeasurements.FetalCrownRumpLength
		};
	}

	openEditMode = () => {
		this.setState({ isEditModeOn: true });
	}

	closeEditMode = () => {
		this.setState({ isEditModeOn: false });
	}

	saveChanges = async (medicalExaminationData) => {
		const { medicalExaminationData: { pregnancyId }, editMedicalExamination } = this.props;
		await editMedicalExamination(pregnancyId, medicalExaminationData);
		this.closeEditMode();
	};

	render() {
		const { isEditModeOn } = this.state;
		const {
			medicalExaminationData: {
				gestationalAgeByUltrasoundWeeks,
				gestationalAgeByUltrasoundDays,
				gestationalAgeOnBloodTestWeeks,
				gestationalAgeOnBloodTestDays,
				gynecologist,
				ultrasoundDataMeasuredBy,
				ultrasoundDate,
				bloodTestDate,
				numericalMeasurements,
				protocol,
				note,
			} } = this.props;

		const translations = getTranslations();

		return (
			<div className='pregnancy__card'>
				<Grid>
					<Row>
						<h4 className='pregnancy__card--title'>
							<span>{translations.pregnancy.trimestersBasicDetails}</span>
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
								<TextInfoDisplay
									label={translations.medicalExamination.property.protocol}
									value={protocol}
								/>

								<DateDisplay
									label={translations.medicalExamination.property.bloodTestDate}
									value={bloodTestDate}
								/>

								<DateDisplay
									label={translations.medicalExamination.property.ultrasoundDate}
									value={ultrasoundDate}
								/>

								<TextInfoDisplay
									label={translations.medicalExamination.property.gynecologist}
									value={gynecologist}
								/>

								<TextInfoDisplay
									label={translations.medicalExamination.property.ultrasoundDataMeasuredBy}
									value={ultrasoundDataMeasuredBy}
								/>

								<NumericalMeasurement
									characteristicName='FetalCrownRumpLength'
									value={numericalMeasurements.FetalCrownRumpLength}
									info='45 - 85 mm'
								/>

								<GestationalAgeDisplay
									label={translations.medicalExamination.property.gestationalAgeByUltrasound}
									weeks={gestationalAgeByUltrasoundWeeks}
									days={gestationalAgeByUltrasoundDays}
								/>

								<GestationalAgeDisplay
									label={translations.medicalExamination.property.gestationalAgeOnBloodTest}
									weeks={gestationalAgeOnBloodTestWeeks}
									days={gestationalAgeOnBloodTestDays}
								/>

								<TextInfoDisplay
									label={translations.medicalExamination.property.note}
									value={note}
								/>
							</div>
							:
							<EditFirstTrimesterBasicInfoForm
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
