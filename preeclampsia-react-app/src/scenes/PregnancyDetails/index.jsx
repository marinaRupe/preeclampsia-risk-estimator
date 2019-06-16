import React, { Component } from 'react';
import { connect } from 'react-redux';
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

class PregnancyDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			isEditModeOn: false,
			addMedicalExaminationModalIsOpen: false,
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

	render() {
		const { pregnancyDetails, medicalExaminations } = this.props;
		const { isLoading, addMedicalExaminationModalIsOpen } = this.state;

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
				<h1>{translations.pregnancy.detailsTitle}</h1>
			
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

					<div className='header mt-10'>
						<h2 className='mt-10 ml-10'>{translations.pregnancy.medicalExaminationsTitle}</h2>
						<div >
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
	createMedicalExamination: pregnancyActions.createMedicalExamination,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PregnancyDetails));
