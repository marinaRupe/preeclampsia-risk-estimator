import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Characteristics } from '../../constants/characteristics.constants';
import { getCharacteristicTranslation } from '../../utils/translation.utils';
import {
  displayEnumMeasurementValue,
} from '../../utils/measurement.utils';

class EnumMeasurement extends Component {
  render() {
    const { characteristicName, value, label = '' } = this.props;

    const characteristic = Characteristics[characteristicName];

    return (
      <Row className='measurement'>
        <Col sm={3}>
          <label>
            {label || getCharacteristicTranslation(characteristic)}:
          </label>
        </Col>
        <Col sm={8}>
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
