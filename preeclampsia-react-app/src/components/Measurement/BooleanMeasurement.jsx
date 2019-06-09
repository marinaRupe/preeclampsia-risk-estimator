import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Characteristics } from 'constants/characteristics.constants';
import { defaultLabelColumnSize, defaultValueColumnSize } from 'constants/values';
import { getCharacteristicTranslation } from 'utils/translation.utils';
import { displayBooleanMeasurementValue } from 'utils/measurement.utils';

class BooleanMeasurement extends Component {
	render() {
		const {
			characteristicName,
			value,
			label = '',
			labelColumnSize = defaultLabelColumnSize,
			valueColumnSize = defaultValueColumnSize,
		} = this.props;

		const characteristic = Characteristics[characteristicName];

		return (
			<Row className='measurement'>
				<Col sm={labelColumnSize}>
					<label>
						{label || getCharacteristicTranslation(characteristic)}:
					</label>
				</Col>
				<Col sm={valueColumnSize}>
					<div className='measurement__info'>
						<div className='details'>
							<span className='value'>
								{displayBooleanMeasurementValue(value)}
							</span>
						</div>
					</div>
				</Col>
			</Row>
		);
	} 
};

export default BooleanMeasurement;
