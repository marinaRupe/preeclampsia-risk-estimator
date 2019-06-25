import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as reportActions from 'redux/reports/report.actions';
import Spinner from 'components/Spinner';
import BooleanMeasurement from 'components/Measurement/BooleanMeasurement';
import EnumMeasurement from 'components/Measurement/EnumMeasurement';
import NumericalMeasurement from 'components/Measurement/NumericalMeasurement';
import DateDisplay from 'components/Measurement/DateDisplay';
import TextInfoDisplay from 'components/Measurement/TextInfoDisplay';
import GestationalAgeDisplay from 'components/Measurement/GestationalAgeDisplay';
import { getAgeInYears } from 'utils/dateTime.utils';
import { getTranslations } from 'utils/translation.utils';

class RiskEstimate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			isGenerating: false,
		};
	}

	componentDidMount() {
		this.setState({
			isLoading: true,
		}, async () => {
			const {
				fetchPregnancyDataForReport,
				match: { params: { medicalExaminationId } },
			} = this.props;

			await fetchPregnancyDataForReport(medicalExaminationId);

			this.setState({
				isLoading: false,
			});
		});
	}

	generatePDF = async () => {
		const {
			generatePDFReport,
			match: { params: { medicalExaminationId } },
		} = this.props;

		this.setState({
			isGenerating: true
		}, async () => {
			try {
				await generatePDFReport(medicalExaminationId);
				this.setState({ isGenerating: false });
			} catch (err) {
				this.setState({ isGenerating: false });
			}
		});
	}

	render() {
		const { isLoading, isGenerating } = this.state;
		const { pregnancyDataForReport, currentUser } = this.props;
		const translations = getTranslations();

		if (isLoading || !pregnancyDataForReport) {
			return (
				<div className='page'>
					<h1>{translations.risk.report.previewTitle}</h1>

					<h3>{translations.risk.report.previewPatientDataTitle}</h3>
					<div className='align-horizontal--center'><Spinner /></div>
					<br />
					<div>
						<Button
							bsStyle='primary'
							onClick={this.generatePDF}
						>
							{translations.risk.report.action.generateReport}
						</Button>
					</div>
				</div>
			);
		}

		const { patient, pregnancy, medicalExamination } = pregnancyDataForReport;
		const {
			booleanMeasurements,
			enumMeasurements,
			numericalMeasurements,
			bloodTestDate,
			ultrasoundDate,
			gestationalAgeByUltrasoundWeeks,
			gestationalAgeByUltrasoundDays,
			gestationalAgeOnBloodTestWeeks,
			gestationalAgeOnBloodTestDays,
			protocol,
			note,
		} = medicalExamination;

		return (
			<div className='page'>
				<h1>{translations.risk.report.previewTitle}</h1>

				<h3>{translations.risk.report.previewPatientDataTitle}</h3>

				<div className='pregnancy__card'>
					<TextInfoDisplay
						label={translations.patient.property.firstName}
						value={patient.firstName}
					/>

					<TextInfoDisplay
						label={translations.patient.property.lastName}
						value={patient.lastName}
					/>

					<DateDisplay
						label={translations.patient.property.birthDate}
						value={patient.birthDate}
					/>

					<TextInfoDisplay
						label={translations.patient.property.MBO}
						value={patient.MBO}
					/>

					<TextInfoDisplay
						label={translations.medicalExamination.property.protocol}
						value={protocol}
					/>

					<NumericalMeasurement
						label={translations.patient.property.ageInYears}
						value={getAgeInYears(patient.birthDate)}
					/>

					<EnumMeasurement
						characteristicName='RacialOrigin'
						value={patient.racialOrigin}
					/>

					<hr />

					<DateDisplay
						label={translations.pregnancy.property.lastPeriodDate}
						value={pregnancy.lastPeriodDate}
					/>

					<BooleanMeasurement
						label={translations.pregnancy.property.lastPeriodDateIsReliable}
						value={pregnancy.lastPeriodDateIsReliable}
					/>

					<DateDisplay
						label={translations.pregnancy.property.deliveryDate}
						value={pregnancy.deliveryDate}
					/>

					<EnumMeasurement
						characteristicName='PregnancyType'
						value={pregnancy.pregnancyType}
					/>

					<EnumMeasurement
						characteristicName='ConceptionMethod'
						value={pregnancy.conceptionMethod}
					/>

					<NumericalMeasurement
						label={translations.pregnancy.property.numberOfPreviousPregnancies}
						value={pregnancy.numberOfPreviousPregnancies}
					/>

					<NumericalMeasurement
						label={translations.pregnancy.property.numberOfPreviousBirths}
						value={pregnancy.numberOfPreviousBirths}
					/>

					<BooleanMeasurement
						label={translations.pregnancy.property.hadPEInPreviousPregnancy}
						value={pregnancy.hadPEInPreviousPregnancy}
					/>

					<BooleanMeasurement
						characteristicName='MotherOfPatientHadPE'
						value={pregnancy.motherOfPatientHadPE}
					/>

					<hr />

					<DateDisplay
						label={translations.medicalExamination.property.bloodTestDate}
						value={bloodTestDate}
					/>

					<DateDisplay
						label={translations.medicalExamination.property.ultrasoundDate}
						value={ultrasoundDate}
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

					{
						Object.keys(booleanMeasurements).map(m => (
							<BooleanMeasurement
								key={booleanMeasurements[m].id}
								value={booleanMeasurements[m]}
								characteristicName={m}
							/>
						))
					}

					{
						Object.keys(enumMeasurements).map(m => (
							<EnumMeasurement
								key={enumMeasurements[m].id}
								value={enumMeasurements[m]}
								characteristicName={m}
							/>
						))
					}

					{
						Object.keys(numericalMeasurements).map(m => (
							<NumericalMeasurement
								key={numericalMeasurements[m].id}
								value={numericalMeasurements[m]}
								characteristicName={m}
							/>
						))
					}

					<TextInfoDisplay
						label={translations.medicalExamination.property.note}
						value={note}
					/>

					<TextInfoDisplay
						label={translations.risk.report.property.responsiblePerson}
						value={`${currentUser.firstName} ${currentUser.lastName}`}
					/>

				</div>

				<br />
				<div className='mb-30 align-horizontal--left'>
					<div>
						<Button
							bsStyle='primary'
							onClick={this.generatePDF}
							disabled={isGenerating}
						>
							{translations.risk.report.action.generateReport}
						</Button>
					</div>
					{
						isGenerating &&
						<div className='ml-20 align-horizontal--center align-vertical--center'>
							<h4>{translations.risk.report.action.generating}</h4>
							<div className='ml-10 spinner--small'><Spinner /></div>
						</div>
					}
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ reports, users }) => {
	return {
		pregnancyDataForReport: reports.pregnancyDataForReport,
		currentUser: users.auth.currentUser,
	};
};

const mapDispatchToProps = {
	generatePDFReport: reportActions.generatePDFReport,
	fetchPregnancyDataForReport: reportActions.fetchPregnancyDataForReport,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RiskEstimate));
