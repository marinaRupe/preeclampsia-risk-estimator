import React, { Component } from 'react';
import BooleanMeasurementInput from 'components/Measurement/Inputs/BooleanMeasurementInput';
import NumericalMeasurementInput from 'components/Measurement/Inputs/NumericalMeasurementInput';

class MaternalCharacteristicsForm extends Component {
	render() {
		const {
			onSubmit,
			error,
			initialValues,
			disabled = {},
			change,
			buttons,
		} = this.props;

		return (
			<form className='redux-form' onSubmit={onSubmit}>
				<div>
					<NumericalMeasurementInput
						characteristicName='Height'
						disabled={disabled.Height}
						measurement={initialValues.Height}
						change={change}
					/>

					<NumericalMeasurementInput
						characteristicName='Weight'
						disabled={disabled.Weight}
						measurement={initialValues.Weight}
						change={change}
					/>

					<BooleanMeasurementInput
						characteristicName='SmokingDuringPregnancy'
						disabled={disabled.SmokingDuringPregnancy}
						measurement={initialValues.SmokingDuringPregnancy}
						change={change}
					/>
				</div>
				{error && <div className='redux-form__error'>{error}</div>}      
				{buttons}
			</form>
		);
	}
}

export default MaternalCharacteristicsForm;
