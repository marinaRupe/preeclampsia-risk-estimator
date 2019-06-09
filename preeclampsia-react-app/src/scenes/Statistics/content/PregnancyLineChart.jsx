import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import { MAX_PREGNANCY_WEEKS } from 'constants/values';

class PregnancyLineChart extends Component {
	render() {
		const { label, lineColor, data } = this.props;

		const chartData = {
			labels: [...Array(MAX_PREGNANCY_WEEKS).keys()],
			datasets: [
				{
					label,
					data,
					fill: false,
					borderColor: lineColor,
				}
			]
		};

		const options = {
			maintainAspectRatio: false,
		};

		return (
			<Line
				data={chartData}
				options={options}
				height={400}
				width={600}
			/>
		);
	}
}

export default PregnancyLineChart;
