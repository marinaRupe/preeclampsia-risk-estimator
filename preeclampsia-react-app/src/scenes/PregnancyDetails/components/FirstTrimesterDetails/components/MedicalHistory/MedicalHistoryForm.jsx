import React, { Component } from 'react';
import EnumMeasurementInput from 'components/Measurement/Inputs/EnumMeasurementInput';
import BooleanMeasurementInput from 'components/Measurement/Inputs/BooleanMeasurementInput';

class MedicalHistoryForm extends Component {
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
          <EnumMeasurementInput
            characteristicName='HypertensionType'
            disabled={disabled.HypertensionType}
            measurement={initialValues.HypertensionType}
            change={change}
          />

          <EnumMeasurementInput
            characteristicName='DiabetesType'
            disabled={disabled.DiabetesType}
            measurement={initialValues.DiabetesType}
            change={change}
          />

          <BooleanMeasurementInput
            characteristicName='SystemicLupusErythematosus'
            disabled={disabled.SystemicLupusErythematosus}
            measurement={initialValues.SystemicLupusErythematosus}
            change={change}
          />

          <BooleanMeasurementInput
            characteristicName='AntiPhospholipidSyndrome'
            disabled={disabled.AntiPhospholipidSyndrome}
            measurement={initialValues.AntiPhospholipidSyndrome}
            change={change}
          />

        </div>
        {error && <div className='redux-form__error'>{error}</div>}      
        {buttons}
      </form>
    );
  }
}

export default MedicalHistoryForm;
