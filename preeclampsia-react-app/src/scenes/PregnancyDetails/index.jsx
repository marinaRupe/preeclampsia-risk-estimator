import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dialog from 'react-bootstrap-dialog';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import { APP } from 'constants/routes';
import * as pregnancyActions from 'redux/pregnancy/pregnancy.actions';
import { getTranslations } from 'utils/translation.utils';
import Spinner from 'components/Spinner';
import history from '../../history';
import FirstTrimesterDetails from './components/FirstTrimesterDetails';
import BasicInfo from './components/BasicInfo';
import AddMedicalExaminationModal from './components/Modals/AddMedicalExaminationModal';
import DeletePregnancyModal from './components/Modals/DeletePregnancyModal';

class PregnancyDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			isEditModeOn: false,
			addMedicalExaminationModalIsOpen: false,
			deletePregnancyModalIsOpen: false,
		};
	}

	componentDidMount() {
		this.setState({
			isLoading: true,
		}, async () => {
			const {
				fetchPregnancyDetails,
				fetchMedicalExaminationsForPregnancy,
				match: { params: { patientId, pregnancyNumber } },
			} = this.props;

			const pregnancy = await fetchPregnancyDetails(patientId, pregnancyNumber);
			await fetchMedicalExaminationsForPregnancy(pregnancy.id);

			this.setState({
				isLoading: false,
			});
		});
	}

	calculateRisk = (medicalExaminationId) => {
		const {
			match: { params: { patientId, pregnancyNumber } },
		} = this.props;

		history.push(APP.RISK_ESTIMATE(patientId, pregnancyNumber, medicalExaminationId));
	}
	
	editPregnancy = async (patientId, pregnancyData) => {
		const { updatePregnancy } = this.props;
		await updatePregnancy(patientId, pregnancyData);
	}

	openAddMedicalExaminationModal = () => {
		this.setState({ addMedicalExaminationModalIsOpen: true });
	}

	closeAddMedicalExaminationModal = () => {
		this.setState({ addMedicalExaminationModalIsOpen: false });
	}

	addMedicalExamination = async (medicalExaminationData) => {
		const { pregnancyDetails, createMedicalExamination } = this.props;
		await createMedicalExamination(pregnancyDetails.id, medicalExaminationData);
		this.closeAddMedicalExaminationModal();
	}

	openDeletePregnancyModal = () => {
		this.setState({ deletePregnancyModalIsOpen: true });
	}

	closeDeletePregnancyModal = () => {
		this.setState({ deletePregnancyModalIsOpen: false });
	}

	deletePregnancy = async () => {
		const {
			pregnancyDetails,
			deletePregnancy,
			match: { params: { patientId } },
		} = this.props;
		try {
			await deletePregnancy(pregnancyDetails.id);
			history.push(APP.PATIENT.DETAILS(patientId));
		} catch (err) {
			this.dialog.showAlert(err.data && err.data.message);
		}
	}

	render() {
		const { pregnancyDetails, medicalExaminations } = this.props;
		const {
			isLoading,
			addMedicalExaminationModalIsOpen,
			deletePregnancyModalIsOpen
		} = this.state;

		const translations = getTranslations();

		if (isLoading || !pregnancyDetails) {
			return (
				<div className='page'>
					<h1>{translations.pregnancy.detailsTitle}</h1>
					<div className='align-horizontal--center'>
						<Spinner />
					</div>
				</div>
			);
		}

		return (
			<div className='page'>
				<Dialog ref={(r) => { this.dialog = r; }} />
				<div className='header'>
					<h1>{translations.pregnancy.detailsTitle}</h1>
					<div>
						<Button
							className='mr-10'
							bsStyle='primary'
							onClick={this.openDeletePregnancyModal}
						>
							{translations.pregnancy.action.delete}
						</Button>
					</div>
				</div>
			
				<div>
					<BasicInfo
						pregnancy={pregnancyDetails}
						editPregnancy={this.editPregnancy}
					/>
					<AddMedicalExaminationModal
						show={addMedicalExaminationModalIsOpen}
						handleClose={this.closeAddMedicalExaminationModal}
						onSubmit={this.addMedicalExamination}
					/>
					<DeletePregnancyModal
						show={deletePregnancyModalIsOpen}
						handleClose={this.closeDeletePregnancyModal}
						deletePregnancy={this.deletePregnancy}
					/>

					<div className='header mt-10'>
						<h2 className='mt-10 ml-10'>{translations.pregnancy.medicalExaminationsTitle}</h2>
						<div>
							<Button
								className='mr-10'
								bsStyle='primary'
								onClick={this.openAddMedicalExaminationModal}
							>
								{translations.medicalExamination.action.add}
							</Button>
						</div>
					</div>
					
					<FirstTrimesterDetails
						pregnancyId={pregnancyDetails.id}
						medicalExaminations={medicalExaminations.filter(me => me.trimesterNumber === 1)}
						calculateRisk={this.calculateRisk}
					/>
				</div>
			</div>
		);
	}
}

const mapStateToProps = ({ pregnancy }) => {
	return {
		pregnancyDetails: pregnancy.details,
		medicalExaminations: pregnancy.medicalExaminations,
	};
};

const mapDispatchToProps = {
	fetchPregnancyDetails: pregnancyActions.fetchPatientPregnancyDetails,
	fetchMedicalExaminationsForPregnancy: pregnancyActions.fetchMedicalExaminationsForPregnancy,
	updatePregnancy: pregnancyActions.updatePregnancy,
	deletePregnancy: pregnancyActions.deletePregnancy,
	createMedicalExamination: pregnancyActions.createMedicalExamination,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PregnancyDetails));
