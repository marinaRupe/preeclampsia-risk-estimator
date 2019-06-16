import React, { Component } from 'react';
import { Grid, Row, Button } from 'react-bootstrap';
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
  			lastPeriodDate,
  			lastPeriodDateIsReliable,
  			deliveryDate,
  			pregnancyType,
  			conceptionMethod,
  			numberOfPreviousBirths,
  			numberOfPreviousPregnancies,
  			hadPEInPreviousPregnancy,
  			motherOfPatientHadPE
  		} } = this.props;

  	return {
			lastPeriodDate,
			lastPeriodDateIsReliable,
			deliveryDate,
			pregnancyType,
			conceptionMethod,
			numberOfPreviousBirths,
			numberOfPreviousPregnancies,
			hadPEInPreviousPregnancy,
			motherOfPatientHadPE
		};
	}

  openEditMode = () => {
  	this.setState({ isEditModeOn: true });
  }

  closeEditMode = () => {
  	this.setState({ isEditModeOn: false });
  }

  saveChanges = () => {
  	this.closeEditMode();
  };

  render() {
  	const { isEditModeOn } = this.state;
  	const {
  		pregnancy: {
  			lastPeriodDate,
  			lastPeriodDateIsReliable,
  			deliveryDate,
  			pregnancyType,
  			conceptionMethod,
  			numberOfPreviousBirths,
  			numberOfPreviousPregnancies,
  			hadPEInPreviousPregnancy,
  			motherOfPatientHadPE
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

  							<BooleanMeasurement
  								label={translations.pregnancy.property.hadPEInPreviousPregnancy}
  								value={hadPEInPreviousPregnancy}
  							/>

  							<BooleanMeasurement
  								characteristicName='MotherOfPatientHadPE'
  								value={motherOfPatientHadPE}
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
