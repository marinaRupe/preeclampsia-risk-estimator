import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { reduxForm, stopSubmit } from 'redux-form';
import { getTranslations } from '../../../../../../utils/translation.utils';
import { EDIT_BIOPHYSICAL_MEASUREMENTS_FORM } from '../../../../../../redux/forms';
import BiophysicalMeasurementsForm from './BiophysicalMeasurementsForm';

class EditBiophysicalMeasurementsForm extends Component {
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
      change,
    } = this.props;

    const translations = getTranslations();

    return (
      <BiophysicalMeasurementsForm
        onSubmit={handleSubmit}
        initialValues={initialValues}
        error={error}
        change={change}
        buttons={
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
        }
      />
    );
  }
}

const mapDispatchToProps = {
  stopSubmitForm: stopSubmit.bind(null, EDIT_BIOPHYSICAL_MEASUREMENTS_FORM, {}),
};

export default connect(null, mapDispatchToProps)(reduxForm({
  form: EDIT_BIOPHYSICAL_MEASUREMENTS_FORM,
  enableReinitialize: true,
})(EditBiophysicalMeasurementsForm));
