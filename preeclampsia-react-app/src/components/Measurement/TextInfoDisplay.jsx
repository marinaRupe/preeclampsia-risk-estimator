import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { defaultLabelColumnSize, defaultValueColumnSize } from '../../constants/values';

class TextInfoDisplay extends Component {
  render() {
    const {
      label,
      value,
      labelColumnSize = defaultLabelColumnSize,
      valueColumnSize = defaultValueColumnSize,
    } = this.props;

    return (
      <Row className='measurement'>
        <Col sm={labelColumnSize}>
          <label>{label}:</label>
        </Col>
        <Col sm={valueColumnSize}>
          <div className='measurement__info'>
            <div className='details'>
              <span className='value'>
                {value || '-'}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    );
  } 
};

export default TextInfoDisplay;
