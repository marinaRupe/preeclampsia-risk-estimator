import React, { Component } from 'react';
import NumericalMeasurementInput from 'components/Measurement/Inputs/NumericalMeasurementInput';

class BiophysicalMeasurementsForm extends Component {
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
						characteristicName='MeanArterialPressure'
						disabled={disabled.MeanArterialPressure}
						measurement={initialValues.MeanArterialPressure}
						change={change}
					/>

					<NumericalMeasurementInput
						characteristicName='MeanUterineArteryPI'
						disabled={disabled.MeanUterineArteryPI}
						measurement={initialValues.MeanUterineArteryPI}
						change={change}
					/>
				</div>
				{error && <div className='redux-form__error'>{error}</div>}      
				{buttons}
			</form>
		);
	}
}

export default BiophysicalMeasurementsForm;
