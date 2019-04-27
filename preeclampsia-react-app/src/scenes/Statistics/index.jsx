import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  render() {
    return (
      <div className='page'>
        <div className='page__header mb-10'>
          <h1>Statistika</h1>
        </div>
        <div>
          TODO
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Statistics));
