import React, { Component } from 'react';
import NumericalMeasurementInput from 'components/Measurement/Inputs/NumericalMeasurementInput';

class BiochemicalMeasurementsForm extends Component {
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
            characteristicName='SerumPLGF'
            disabled={disabled.SerumPLGF}
            measurement={initialValues.SerumPLGF}
            change={change}
          />

          <NumericalMeasurementInput
            characteristicName='SerumPAPPA'
            disabled={disabled.SerumPAPPA}
            measurement={initialValues.SerumPAPPA}
            change={change}
          />
        </div>
        {error && <div className='redux-form__error'>{error}</div>}      
        {buttons}
      </form>
    );
  }
}

export default BiochemicalMeasurementsForm;
