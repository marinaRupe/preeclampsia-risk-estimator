import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import { formatDate } from '../../utils/dateTime.utils';

class DateDisplay extends Component {
  render() {
    const { label, value } = this.props;

    return (
      <Row className='measurement'>
        <Col sm={3}>
          <label>{label}</label>
        </Col>
        <Col sm={8}>
          <div className='measurement__info'>
            <div className='details'>
              <span className='value'>
                {formatDate(value)}
              </span>
            </div>
          </div>
        </Col>
      </Row>
    );
  } 
};

export default DateDisplay;
