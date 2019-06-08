import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Characteristics } from '../../../constants/characteristics.constants';

class MeasurementInput extends Component {
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
    const newValue = e.target.value ? parseFloat(e.target.value) : null;

    const newMeasurement = {
      ...measurement,
      value: newValue,
    };

    change(characteristicName, newMeasurement);;
  }

  render() {
    const {
      type,
      placeholder = '',
      required = false,
      disabled = false,
      className = '',
      meta: { touched = false, error = '' }
    } = this.props;
  
    const inputProps = this.props.input || {};
    const hasError = touched && error && (error.length > 0);
  
    return (
      <div className={className}>
        <input
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          className={`redux-form__input ${hasError ? 'error' : ''}`}
          {...inputProps}
          value={inputProps.value && inputProps.value.value}
          onChange={this.updateMeasurement}
          onBlur={undefined}
        />
        {hasError &&
          <div className='redux-form__error--field'>
            {error.map((e, index) => <div key={index}>{e}</div>)}
          </div>
        }
      </div>
    );
  }
};

MeasurementInput.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.array
  }),
  input: PropTypes.object
};

export default MeasurementInput;
