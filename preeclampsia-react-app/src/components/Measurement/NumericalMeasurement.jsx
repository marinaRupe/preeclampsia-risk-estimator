import React, { Component } from 'react';
import { Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Characteristics } from '../../constants/characteristics.constants';
import { getCharacteristicTranslation } from '../../utils/translation.utils';
import {
  displayNumericalMeasurementValue,
} from '../../utils/measurement.utils';

class NumericalMeasurement extends Component {
  render() {
    const { characteristicName, value, label = '', unitOfMeasure = '', info = '' } = this.props;

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
                {displayNumericalMeasurementValue(value, label ? unitOfMeasure : characteristic.unitOfMeasure)}
              </span>
              {
                info &&
                <OverlayTrigger
                  placement='right'
                  overlay={(
                    <Tooltip className='in' id='fetal-crown-tooltip'>
                      <span className='constraint'>{info}</span>
                    </Tooltip>
                  )}
                >
                  <i className='material-icons'>info</i>
                </OverlayTrigger>
              }
            </div>
          </div>
        </Col>
      </Row>
    );
  } 
};

export default NumericalMeasurement;
