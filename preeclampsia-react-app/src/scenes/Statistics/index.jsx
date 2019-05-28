import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Characteristics } from '../../constants/characteristics.constants';
import { getTranslations } from '../../utils/translation.utils';
import * as statisticsActions from '../../redux/actions/statistics.actions';
import PregnancyLineChart from './content/PregnancyLineChart';

class Statistics extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    }, async () => {
      const { fetchMediansForCharacteristic } = this.props;
      await fetchMediansForCharacteristic(Characteristics.SerumPAPPA.key);
      await fetchMediansForCharacteristic(Characteristics.SerumPLGF.key);

      this.setState({
        isLoading: false,
      });
    });
  }

  render() {
    const translations = getTranslations();
    const { mediansForCharacteristics } = this.props;

    const PLGFMedians = mediansForCharacteristics[Characteristics.SerumPLGF.key];
    const PLGFMediansNoPE = PLGFMedians ? PLGFMedians.withoutPE : {};
    const PLGFMediansPE = PLGFMedians ? PLGFMedians.withPE : {};

    const PAPPAMedians = mediansForCharacteristics[Characteristics.SerumPAPPA.key];
    const PAPPAMediansNoPE = PAPPAMedians ? PAPPAMedians.withoutPE : {};
    const PAPPAMediansPE = PAPPAMedians ? PAPPAMedians.withPE : {};

    const PAPPADataNoPE = Object.entries(PAPPAMediansNoPE)
      .map(([week, value]) => ({ x: parseInt(week), y: value }));

    const PAPPAfDataPE = Object.entries(PAPPAMediansPE)
      .map(([week, value]) => ({ x: parseInt(week), y: value }));

    const PLGFDataNoPE = Object.entries(PLGFMediansNoPE)
      .map(([week, value]) => ({ x: parseInt(week), y: value }));

    const PLGFDataPE = Object.entries(PLGFMediansPE)
      .map(([week, value]) => ({ x: parseInt(week), y: value }));

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

const mapStateToProps = ({ statistics }) => {
  return {
    mediansForCharacteristics: statistics.mediansForCharacteristics,
  };
};

const mapDispatchToProps = {
  fetchMediansForCharacteristic: statisticsActions.fetchMediansForCharacteristic,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Statistics));
