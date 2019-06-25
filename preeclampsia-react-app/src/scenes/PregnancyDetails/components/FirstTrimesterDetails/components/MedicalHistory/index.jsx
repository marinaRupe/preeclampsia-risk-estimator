import React, { Component } from 'react';
import { Grid, Row } from 'react-bootstrap';
import { getTranslations } from 'utils/translation.utils';
import { extractMeasurementsInitialValues } from 'utils/measurement.utils';
import BooleanMeasurement from 'components/Measurement/BooleanMeasurement';
import EnumMeasurement from 'components/Measurement/EnumMeasurement';
import EditMedicalHistoryForm from './EditMedicalHistoryForm';

class MedicalHistory extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isEditModeOn: false,
		};
	}

  openEditMode = () => {
  	this.setState({ isEditModeOn: true });
  }

  closeEditMode = () => {
  	this.setState({ isEditModeOn: false });
  }

  saveChanges = async (measurementsData) => {
  	const { medicalExaminationData, updateMeasurements } = this.props;
  	await updateMeasurements(medicalExaminationData.id, measurementsData);
  	this.closeEditMode();
  };

  getEditMeasurementsInitialValues = () => {
  	const { medicalExaminationData } = this.props;
  	const enumCharacteristics = ['HypertensionType', 'DiabetesType'];
  	const booleanCharacteristics = ['SystemicLupusErythematosus', 'AntiPhospholipidSyndrome'];

  	return extractMeasurementsInitialValues(
  		medicalExaminationData,
  		booleanCharacteristics,
  		enumCharacteristics,
  		[],
  	);
  }

  render() {
  	const { isEditModeOn } = this.state;
  	const {
  		medicalExaminationData: {
  			enumMeasurements,
  			booleanMeasurements,
  		},
  	} = this.props;

  	const translations = getTranslations();

  	return (
  		<div className='pregnancy__card'>
  			<Grid>
  				<Row>
  					<h4 className='pregnancy__card--title'>
  						<span>{translations.pregnancy.medicalHistoryTitle}</span>
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
  							<EnumMeasurement
  								characteristicName='HypertensionType'
  								value={enumMeasurements.HypertensionType}
  							/>

  							<EnumMeasurement
  								characteristicName='DiabetesType'
  								value={enumMeasurements.DiabetesType}
  							/>

  							<BooleanMeasurement
  								characteristicName='SystemicLupusErythematosus'
  								value={booleanMeasurements.SystemicLupusErythematosus}
  							/>

  							<BooleanMeasurement
  								characteristicName='AntiPhospholipidSyndrome'
  								value={booleanMeasurements.AntiPhospholipidSyndrome}
  							/>
  						</div>
  						:
  						<EditMedicalHistoryForm
  							onSubmit={this.saveChanges}
  							closeEditMode={this.closeEditMode}
  							initialValues={this.getEditMeasurementsInitialValues()}
  						/>
  				}
  			</Grid>
  		</div>
  	);
  }
}

export default MedicalHistory;
