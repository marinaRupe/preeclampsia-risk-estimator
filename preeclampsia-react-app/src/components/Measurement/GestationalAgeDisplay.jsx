import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

class GestationalAgeDisplay extends Component {
  render() {
    const { label, weeks, days } = this.props;
    const exists = (weeks !== undefined && weeks !== null) && (days !== undefined && days !== null);

    return (
      <Row className='measurement'>
        <Col sm={3}>
          <label>{label}</label>
        </Col>
        <Col sm={8}>
          <div className='measurement__info'>
            <div className='details'>
              <span className='value'>
                {
                  exists
                    ? <span>{weeks}<sup>+{days}</sup></span>
                    : '-'
                }
              </span>
            </div>
          </div>
        </Col>
      </Row>
    );
  } 
};

export default GestationalAgeDisplay;
