import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit } from 'redux-form';
import { getTranslations } from '../../../../../../utils/translation.utils';
import { EDIT_MATERNAL_CHARACTERISTICS_FORM } from '../../../../../../redux/forms';
import NumericalMeasurementInput from '../../../../../../components/Measurement/Inputs/NumericalMeasurementInput';

class BiophysicalMeasurementsForm extends Component {
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
        <div>
          <div>
            <Button
              bsStyle='primary'
              type='sumbit'
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
  stopSubmitForm: stopSubmit.bind(null, EDIT_MATERNAL_CHARACTERISTICS_FORM, {}),
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: EDIT_MATERNAL_CHARACTERISTICS_FORM,
  enableReinitialize: true,
})(BiophysicalMeasurementsForm));
