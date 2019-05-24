import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { getTranslations } from '../../utils/translation.utils';
import PregnancyLineChart from './content/PregnancyLineChart';

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  render() {
    const translations = getTranslations();

    const PAPPADataNoPE = [
      { x: 11, y: 200 },
      { x: 12, y: 300 },
      { x: 13, y: 400 },
      { x: 14, y: 300 },
    ];

    const PAPPAfDataPE = [
      { x: 11, y: 200 },
      { x: 12, y: 300 },
      { x: 13, y: 400 },
      { x: 14, y: 300 },
    ];

    const PLGFDataNoPE = [
      { x: 11, y: 200 },
      { x: 12, y: 300 },
      { x: 13, y: 400 },
      { x: 14, y: 300 },
    ];

    const PLGFDataPE = [
      { x: 11, y: 200 },
      { x: 12, y: 300 },
      { x: 13, y: 400 },
      { x: 14, y: 300 },
    ];

    return (
      <div className='page'>
        <div className='page__header mb-10'>
          <h1>{translations.statistics.title}</h1>
        </div>
        <div>
          <h3>{translations.statistics.PAPPAMediansNoPETitle}</h3>
          <PregnancyLineChart
            data={PAPPADataNoPE}
            lineColor='blue'
            label='PAPP-A'
          />
        </div>
        <div>
          <h3>{translations.statistics.PAPPAMediansPETitle}</h3>
          <PregnancyLineChart
            data={PAPPAfDataPE}
            lineColor='red'
            label='PAPP-A'
          />
        </div>
        <div>
          <h3>{translations.statistics.PLGFMediansNoPETitle}</h3>
          <PregnancyLineChart
            data={PLGFDataNoPE}
            lineColor='blue'
            label='PLGF'
          />
        </div>
        <div>
          <h3>{translations.statistics.PLGFMediansPETitle}</h3>
          <PregnancyLineChart
            data={PLGFDataPE}
            lineColor='red'
            label='PLGF'
          />
        </div>
      </div>
    );
  }
}

export default connect()(withRouter(Statistics));
