import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { getAgeInYears } from 'utils/dateTime.utils';
import { getTranslations } from 'utils/translation.utils';
import EnumMeasurement from 'components/Measurement/EnumMeasurement';
import NumericalMeasurement from 'components/Measurement/NumericalMeasurement';
import DateDisplay from 'components/Measurement/DateDisplay';
import TextInfoDisplay from 'components/Measurement/TextInfoDisplay';

class PatientSidebar extends Component {
	render() {
		const {
			patient,
			closeSidebar,
			openEditPatientModal,
			openDeletePatientModal,
		} = this.props;

		const translations = getTranslations();
		const labelColumnSize = 5;
		const valueColumnSize = 6;

		return (
			<div className='table-view--details'>
				<div>
					<div className='table-view--details__header'>
						<h4>{translations.patient.detailsTitle}</h4>
						<i className='material-icons' onClick={closeSidebar}>close</i>
					</div>
					<div>
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
					</div>
				</div>
				
				<div className='table-view--details__footer'>
					<Button
						bsStyle='primary'
						onClick={openEditPatientModal}
					>
						{translations.patient.action.edit}
					</Button>
					<Button
						bsStyle='danger'
						onClick={openDeletePatientModal}
					>
						{translations.patient.action.delete}
					</Button>
				</div>
			</div>
		);
	}
}

export default PatientSidebar;
