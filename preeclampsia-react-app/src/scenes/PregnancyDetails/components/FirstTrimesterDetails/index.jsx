import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getTranslations } from 'utils/translation.utils';
import Spinner from 'components/Spinner';
import * as medicalExaminationActions from 'redux/actions/pregnancy.actions';
import MaternalCharacteristics from './components/MaternalCharacteristics';
import MedicalHistory from './components/MedicalHistory';
import BiophysicalMeasurements from './components/BiophysicalMeasurements';
import BiochemicalMeasurements from './components/BiochemicalMeasurements';
import BasicInfo from './components/BasicInfo';

class FirstTrimesterDetails extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLoading: false,
			isEditModeOn: false,
		};
	}

  updateMeasurements = (medicalExaminationId, measurementsData) => {
  	const { updateMeasurements } = this.props;
  	updateMeasurements(medicalExaminationId, measurementsData);
  }
  
  render() {
  	const { medicalExaminations, calculateRisk } = this.props;
  	const { isLoading } = this.state;
  	const trimesterNumber = 1;

  	const translations = getTranslations();

  	if (isLoading || !medicalExaminations) {
  		return (
  			<div className='pregnancy__trimester'>
  				<h3>{translations.word.trimester} {trimesterNumber}</h3>
  				<div className='align-horizontal--center'>
  					<Spinner />
  				</div>
  			</div>
  		);
  	}

  	return (
  		<div className='pregnancy__trimester'>
  			<h3>{translations.word.trimester} {trimesterNumber}</h3>
      
  			{
  				medicalExaminations.map(medicalExamination => (
  					<div key={medicalExamination.id}>
  						<div>
  							<BasicInfo medicalExaminationData={medicalExamination} />
  							<MaternalCharacteristics
  								medicalExaminationData={medicalExamination}
  								updateMeasurements={this.updateMeasurements}
  							/>
  							<MedicalHistory
  								medicalExaminationData={medicalExamination}
  								updateMeasurements={this.updateMeasurements}
  							/>
  							<BiophysicalMeasurements
  								medicalExaminationData={medicalExamination}
  								updateMeasurements={this.updateMeasurements}
  							/>
  							<BiochemicalMeasurements
  								medicalExaminationData={medicalExamination}
  								updateMeasurements={this.updateMeasurements}
  							/>
  						</div>
  						<Button
  							bsStyle='primary'
  							onClick={calculateRisk.bind(null, medicalExamination.id)}
  						>
  							{translations.risk.calculateRisk}
  						</Button>
  					</div>
  				))
  			}
  		</div>
  	);
  }
}

const mapDispatchToProps = {
	updateMeasurements: medicalExaminationActions.updateMeasurementsForMedicalExaminations,
};

export default connect(null, mapDispatchToProps)(FirstTrimesterDetails);
