import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { reduxForm, stopSubmit } from 'redux-form';
import { getTranslations } from '../../../../../../utils/translation.utils';
import { EDIT_MEDICAL_HISTORY_FORM } from '../../../../../../redux/forms';
import EnumMeasurementInput from '../../../../../../components/Measurement/Inputs/EnumMeasurementInput';
import BooleanMeasurementInput from '../../../../../../components/Measurement/Inputs/BooleanMeasurementInput';

class MedicalHistoryForm extends Component {
  handleClose = async () => {
    const { closeEditMode, stopSubmitForm } = this.props;
    closeEditMode();
    await stopSubmitForm();
  }

  render() {
    const {
      handleSubmit,
      error,
      initialValues,
      disabled = {},
      change,
    } = this.props;

    const translations = getTranslations();

    return (
      <form className='redux-form' onSubmit={handleSubmit}>
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
        <div>
          <div>
            <Button
              bsStyle='primary'
              type='submit'
            >
              {translations.pregnancy.action.save}
            </Button>
            <Button
              bsStyle='default'
              onClick={this.handleClose}
            >
              {translations.action.cancel}
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = {
  stopSubmitForm: stopSubmit.bind(null, EDIT_MEDICAL_HISTORY_FORM, {}),
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: EDIT_MEDICAL_HISTORY_FORM,
  enableReinitialize: true,
})(MedicalHistoryForm));
