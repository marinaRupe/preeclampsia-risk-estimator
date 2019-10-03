import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Characteristics } from 'constants/characteristics.constants';
import { getTranslations } from 'utils/translation.utils';
import * as statisticsActions from 'redux/statistics/statistics.actions';
import PregnancyLineChart from './content/PregnancyLineChart';
import { MAX_PREGNANCY_WEEKS, MAX_DAYS_IN_TRIMESTER, MIN_VISIBLE_DAYS_IN_FIRST_TRIMESTER } from 'constants/values';

function gestationalAgeFromDaysFormatter(value, index, values) {
	const week = Math.floor(value / 7);
	const day = value % 7;

	return `${week} +${day}`;
}

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

		const PAPPAMedians = mediansForCharacteristics[Characteristics.SerumPAPPA.key];
		const PAPPAMediansNoPE = PAPPAMedians ? PAPPAMedians.withoutPE : {};

		const PAPPADataNoPEWeeks = Object.entries(PAPPAMediansNoPE.mediansByWeek || {})
			.map(([week, value]) => ({ x: parseInt(week), y: value }));

		const PLGFDataNoPEWeeks = Object.entries(PLGFMediansNoPE.mediansByWeek || {})
			.map(([week, value]) => ({ x: parseInt(week), y: value }));

		const PAPPADataNoPEDaysForFirstTrimester = Object.entries(PAPPAMediansNoPE.mediansByDayForFirstTrimester || {})
			.map(([day, value]) => ({ x: parseInt(day), y: value }));

		const PLGFDataNoPEDaysForFirstTrimester = Object.entries(PLGFMediansNoPE.mediansByDayForFirstTrimester || {})
			.map(([day, value]) => ({ x: parseInt(day), y: value }));

		return (
			<div className='page'>
				<div className='page__header mb-10'>
					<h1>{translations.statistics.title}</h1>
				</div>
				<div>
					<h3>{translations.statistics.PAPPAMedians}</h3>
					<PregnancyLineChart
						data={PAPPADataNoPEWeeks}
						xAxisMax={MAX_PREGNANCY_WEEKS}
						lineColor='blue'
						label='PAPP-A'
					/>
				</div>
				<div>
					<h3>{translations.statistics.PAPPAMedians} ({translations.statistics.firstTrimester})</h3>
					<PregnancyLineChart
						data={PAPPADataNoPEDaysForFirstTrimester}
						xAxisMax={MAX_DAYS_IN_TRIMESTER}
						xAxisMin={MIN_VISIBLE_DAYS_IN_FIRST_TRIMESTER}
						xAxisFormatter={gestationalAgeFromDaysFormatter}
						lineColor='blue'
						label='PAPP-A'
					/>
				</div>
				<div>
					<h3>{translations.statistics.PLGFMedians}</h3>
					<PregnancyLineChart
						data={PLGFDataNoPEWeeks}
						xAxisMax={MAX_PREGNANCY_WEEKS}
						lineColor='blue'
						label='PLGF'
					/>
				</div>
				<div>
					<h3>{translations.statistics.PLGFMedians} ({translations.statistics.firstTrimester})</h3>
					<PregnancyLineChart
						data={PLGFDataNoPEDaysForFirstTrimester}
						xAxisMax={MAX_DAYS_IN_TRIMESTER}
						xAxisMin={MIN_VISIBLE_DAYS_IN_FIRST_TRIMESTER}
						xAxisFormatter={gestationalAgeFromDaysFormatter}
						lineColor='blue'
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
