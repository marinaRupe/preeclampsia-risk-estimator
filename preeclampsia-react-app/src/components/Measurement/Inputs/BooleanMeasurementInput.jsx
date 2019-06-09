import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Characteristics } from 'constants/characteristics.constants';
import { getCharacteristicTranslation } from 'utils/translation.utils';
import {
	getBooleanMeasurementOptions,
} from 'utils/measurement.utils';
import MeasurementSelect from './MeasurementSelect';

class BooleanMeasurementInput extends Component {
	render() {
		const {
			characteristicName,
			label = '',
			required = false,
			disabled = false,
			measurement,
			change,
		} = this.props;

		const characteristic = Characteristics[characteristicName];

		return (
			<div className='redux-form__row'>
				<div className='w-50'>
					<label className='redux-form__label'>
						{label || getCharacteristicTranslation(characteristic)}
						{required && <span className='required'>*</span>}
					</label>

					<Field
						name={characteristicName}
						component={MeasurementSelect}
						disabled={disabled}
						children={getBooleanMeasurementOptions()}
						className='mr-20'
						change={change}
						characteristicName={characteristicName}
						measurement={measurement}
					/>
				</div>
			</div>
		);
	} 
};

export default BooleanMeasurementInput;
