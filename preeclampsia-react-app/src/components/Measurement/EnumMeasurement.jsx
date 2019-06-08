import React, { Component } from 'react';
import { Field } from 'redux-form';
import Select from '../Inputs/Select';
import { Row, Col } from 'react-bootstrap';
import { Characteristics } from '../../constants/characteristics.constants';
import { defaultLabelColumnSize, defaultValueColumnSize } from '../../constants/values';
import { getCharacteristicTranslation } from '../../utils/translation.utils';
import {
  getEnumMeasurementOptions,
  displayEnumMeasurementValue,
} from '../../utils/measurement.utils';

class EnumMeasurement extends Component {
  render() {
    const {
      characteristicName,
      value,
      label = '',
      labelColumnSize = defaultLabelColumnSize,
      valueColumnSize = defaultValueColumnSize,
      editMode = false,
      disabled = false
    } = this.props;

    const characteristic = Characteristics[characteristicName];

    if (editMode) {
      return (
        <div className='redux-form__row'>
          <div className='w-50'>
            <label className='redux-form__label'>
              {label || getCharacteristicTranslation(characteristic)}
              <span className='required'>*</span>
            </label>
            <Field
              name={characteristicName}
              component={Select}
              disabled={disabled}
              children={getEnumMeasurementOptions(characteristic.key)}
              className='mr-20'
            />
          </div>
        </div>
      );
    }

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
                {displayEnumMeasurementValue(value, characteristic.key)}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    );
  } 
};

export default EnumMeasurement;
