import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Characteristics } from 'constants/characteristics.constants';

class MeasurementSelect extends Component {
	constructor(props) {
		super(props);

		const characteristic = Characteristics[props.characteristicName];

		this.state = {
			measurement: { ...props.measurement, characteristicId: characteristic.key },
		};
	}

  updateMeasurement = (e) => {
  	const { measurement } = this.state;
  	const { change, characteristicName } = this.props;
  	const newMeasurement = {
  		...measurement,
  		value: e.target.value,
  	};

  	change(characteristicName, newMeasurement);;
  }

  render() {
  	const {
  		required = false,
  		disabled = false,
  		meta: { touched, error },
  		children,
  		className = '',
  	} = this.props;
  
  	const inputProps = this.props.input || {};
  	const hasError = touched && error && (error.length > 0);
  
  	return (
  		<div className={`redux-form__select ${disabled ? 'disabled' : ''} ${className}`}>
  			<select
  				className='w-100'
  				required={required}
  				disabled={disabled}
  				{...inputProps}
  				value={inputProps.value && inputProps.value.value}
  				onChange={this.updateMeasurement}
  				onBlur={undefined}
  			>
  				{children}
  			</select>
  			{hasError &&
          <div className='redux-form__error--field'>
          	{error.map((e, index) => <div key={index}>{e}</div>)}
          </div>
  			}
  		</div>
  	);
  }
};

MeasurementSelect.propTypes = {
	required: PropTypes.bool,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	meta: PropTypes.shape({
		touched: PropTypes.bool,
		error: PropTypes.array
	}),
	input: PropTypes.object,
	children: PropTypes.array.isRequired
};

export default MeasurementSelect;
