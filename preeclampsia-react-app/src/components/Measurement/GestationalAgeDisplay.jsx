import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { defaultLabelColumnSize, defaultValueColumnSize } from 'constants/values';

class GestationalAgeDisplay extends Component {
	render() {
		const {
			label,
			weeks,
			days,
			labelColumnSize = defaultLabelColumnSize,
			valueColumnSize = defaultValueColumnSize,
		} = this.props;
		const exists = (weeks !== undefined && weeks !== null) && (days !== undefined && days !== null);

		return (
			<Row className='measurement'>
				<Col sm={labelColumnSize}>
					<label>{label}:</label>
				</Col>
				<Col sm={valueColumnSize}>
					<div className='measurement__info'>
						<div className='details'>
							<span className='value'>
								{
									exists
										? <span>{weeks}<sup>+{days}</sup></span>
										: '-'
								}
							</span>
						</div>
					</div>
				</Col>
			</Row>
		);
	} 
};

export default GestationalAgeDisplay;
