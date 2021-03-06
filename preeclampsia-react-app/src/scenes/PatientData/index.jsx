import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import * as patientActions from 'redux/patients/patient.actions';
import * as pregnancyActions from 'redux/pregnancy/pregnancy.actions';
import { APP } from 'constants/routes';
import { getAgeInYears } from 'utils/dateTime.utils';
import { getTranslations } from 'utils/translation.utils';
import Spinner from 'components/Spinner';
import TextInfoDisplay from 'components/Measurement/TextInfoDisplay';
import DateDisplay from 'components/Measurement/DateDisplay';
import NumericalMeasurement from 'components/Measurement/NumericalMeasurement';
import EnumMeasurement from 'components/Measurement/EnumMeasurement';
import EditPatientModal from '../PatientList/content/EditPatientModal';
import AddPregnancyModal from './content/AddPregnancyModal';

class PatientData extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			editPatientModalIsOpen: false,
			addPregnancyModalIsOpen: false,
		};
	}

	componentDidMount() {
		this.setState({
			isLoading: true,
		}, async () => {
			const {
				fetchPatientDetails,
				match: { params: { patientId } },
			} = this.props;

			await fetchPatientDetails(patientId);

			this.setState({
				isLoading: false,
			});
		});
	}

	openEditPatientModal = () => {
		this.setState({ editPatientModalIsOpen: true });
	}

	closeEditPatientModal = () => {
		this.setState({ editPatientModalIsOpen: false });
	}
	
	openAddPregnancyModal = () => {
		this.setState({ addPregnancyModalIsOpen: true });
	}

	closeAddPregnancyModal = () => {
		this.setState({ addPregnancyModalIsOpen: false });
	}

	editPatient = async (patientData) => {
		const { updatePatient } = this.props;
		await updatePatient(patientData);
		this.closeEditPatientModal();
	}

	addPregnancy = async (pregnancyData) => {
		const { patient, createPregnancy, fetchPatientDetails } = this.props;
		await createPregnancy(patient.id, pregnancyData);
		this.closeAddPregnancyModal();
		await fetchPatientDetails(patient.id);
	}

	render() {
		const { patient } = this.props;
		const { isLoading, editPatientModalIsOpen, addPregnancyModalIsOpen } = this.state;

		const translations = getTranslations();

		const labelColumnSize = 2;
		const valueColumnSize = 9;

		if (isLoading || !patient) {
			return (
				<div className='page'>
					<div className='patient-details__header mb-10'>
						<h1>{translations.patient.detailsTitle}</h1>
					</div>
					<div className='patient-details__content ml-20'>
						<div className='align-horizontal--center'>
							<Spinner />
						</div>
					</div>
				</div>
			);
		}

		return (
			<div className='page'>
				<EditPatientModal
					show={editPatientModalIsOpen}
					handleClose={this.closeEditPatientModal}
					onSubmit={this.editPatient}
					initialValues={patient}
				/>
				<AddPregnancyModal
					show={addPregnancyModalIsOpen}
					handleClose={this.closeAddPregnancyModal}
					onSubmit={this.addPregnancy}
				/>
				<div className='patient-details__header mb-10'>
					<h1>{translations.patient.detailsTitle}</h1>
					<Button
						bsStyle='primary'
						onClick={this.openEditPatientModal}
					>
						{translations.patient.action.edit}
					</Button>
				</div>

				<div className='patient-details__content ml-20'>
					<TextInfoDisplay
						label={translations.patient.property.firstName}
						value={patient.firstName}
						labelColumnSize={labelColumnSize}
						valueColumnSize={valueColumnSize}
					/>

					<TextInfoDisplay
						label={translations.patient.property.lastName}
						value={patient.lastName}
						labelColumnSize={labelColumnSize}
						valueColumnSize={valueColumnSize}
					/>

					<TextInfoDisplay
						label={translations.patient.property.MBO}
						value={patient.MBO}
						labelColumnSize={labelColumnSize}
						valueColumnSize={valueColumnSize}
					/>

					<DateDisplay
						label={translations.patient.property.birthDate}
						value={patient.birthDate}
						labelColumnSize={labelColumnSize}
						valueColumnSize={valueColumnSize}
					/>

					<NumericalMeasurement
						label={translations.patient.property.ageInYears}
						value={getAgeInYears(patient.birthDate)}
						labelColumnSize={labelColumnSize}
						valueColumnSize={valueColumnSize}
					/>
					
					<EnumMeasurement
						characteristicName='RacialOrigin'
						value={patient.racialOrigin}
						labelColumnSize={labelColumnSize}
						valueColumnSize={valueColumnSize}
					/>

					<div className='patient-details__pregnancies'>
						<div className='align-vertical--center mt-10'>
							<h3 className='mt-10'>{translations.patient.pregnanciesTitle}</h3>
							<div className='ml-15'>
								<Button
									bsStyle='primary'
									onClick={this.openAddPregnancyModal}
								>
									{translations.pregnancy.action.add}
								</Button>
							</div>
						</div>
						
						{(patient.pregnancies || []).map(preg => (
							<div key={preg.id}>
								<Link to={APP.PATIENT.PREGNANCY_DETAILS(patient.id, preg.pregnancyNumber)}>
									{translations.word.pregnancy} {preg.pregnancyNumber}
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ patients }) => {
	return {
		patient: patients.patientDetails,
	};
};

const mapDispatchToProps = {
	fetchPatientDetails: patientActions.fetchPatient,
	updatePatient: patientActions.updatePatientDetails,
	createPregnancy: pregnancyActions.createPregnancy,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PatientData));